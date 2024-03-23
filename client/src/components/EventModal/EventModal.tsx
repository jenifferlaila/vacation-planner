import { Modal, Button, Form, AutoComplete } from "rsuite"
import useEventModal, { eventModel } from "./EventModal.hook"
import { Controller } from "react-hook-form"
import { Field } from ".."
import { texts } from "../../util"
import { Event, PublicUser } from "../../services"

export type EventModalProps = {
    date: Date
    open?: boolean
    onClose?: () => void
    publicUsers: PublicUser[]
    onSubmit: (event: Omit<Event, "id">) => void
}

function EventModal(props: EventModalProps) {
    const { date, open, onClose, onSubmit, publicUsers } = props

    const {
        control,
        errors,
        participant,
        setParticipant,
        handleClose,
        handleSubmit,
        submit,
        userNames,
    } = useEventModal(publicUsers, date, onSubmit, onClose)

    return (
        <Modal open={open} onClose={onClose} size="lg">
            <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>

            <Form model={eventModel} onSubmit={(_, e) => submit(handleSubmit)(e)}>
                <Modal.Body>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: texts["login.form.username.required"],
                        }}
                        render={({ field }) => (
                            <Field
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors[field.name]?.message}
                                label={texts["modal.calendar.event.name"]}
                                placeholder={
                                    texts[
                                        "modal.calendar.event.name.description"
                                    ]
                                }
                            />
                        )}
                    />

                    <AutoComplete
                        data={userNames}
                        onChange={setParticipant}
                        value={participant}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EventModal
