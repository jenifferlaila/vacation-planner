import { useForm } from "react-hook-form"
import { Event, PublicUser } from "../../services"
import { Schema } from "rsuite"
import { useCallback, useMemo, useState } from "react"
import { useApp } from "../../contexts"

export const eventModel = Schema.Model({
    title: Schema.Types.StringType().isRequired(),
    start: Schema.Types.DateType().isRequired(),
})

const defaultValues: Omit<Event, "id"> = {
    title: "",
    creator: "",
    vacation_id: "",
    start: new Date(),
    participants: [],
}

export default function useEventModal(
    publicUsers: PublicUser[],
    date: Date,
    onSubmit: (event: Omit<Event, "id">) => void,
    onClose?: () => void,
) {
    const {
        control,
        handleSubmit: submit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues })
    const { user } = useApp()

    const [participant, setParticipant] = useState<string>()

    const userNames = useMemo(
        () =>
            publicUsers
                .filter(({ username }) => username !== user?.username)
                .map(({ name, username }) => `${name} (${username})`),
        [publicUsers, user],
    )

    const selectedParticipant = useMemo(() => {
        if (!participant) return undefined

        const current = (participant.split("(")[1] ?? "").replace(")", "")
        if (!current.length) return undefined

        return publicUsers.find(({ username }) => username === current)
    }, [publicUsers, participant])

    const handleClose = useCallback(() => {
        setParticipant(undefined)
        reset(defaultValues)

        onClose && onClose()
    }, [onClose])

    const handleSubmit = useCallback(
        (event: Omit<Event, "id">) => {
            if (!user) return handleClose()
            onSubmit({
                ...event,
                start: date,
                creator: user.id,
                participants: selectedParticipant
                    ? [selectedParticipant.id]
                    : [],
            })
            handleClose()
        },
        [date, user, selectedParticipant, handleClose, onSubmit],
    )

    return {
        control,
        errors,
        participant,
        setParticipant,
        submit,
        handleClose,
        handleSubmit,
        userNames,
    }
}
