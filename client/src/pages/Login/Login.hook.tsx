import { useCallback, useState } from "react"

import { useNavigate } from "react-router-dom"
import { Notification, Schema, useToaster } from "rsuite"

import { useApp } from "../../contexts"
import { texts } from "../../util"
import { useForm } from "react-hook-form"
import { User } from "../../services"

export const userModel = Schema.Model({
    username: Schema.Types.StringType().isRequired(texts["login.form.username.required"]),
    password: Schema.Types.StringType()
        .minLength(6, texts["login.form.password.length"])
        .isRequired(texts["login.form.password.required"]),
})

const defaultValues: Omit<User, "id"> = {
    username: "",
    password: "",
}

export default function useLogin() {
    const toaster = useToaster()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues })

    const { onLogin } = useApp()

    const [showPassword, setShowPassword] = useState(false)

    const getMessage = useCallback(
        (type: "success" | "error", message: string) => (
            <Notification type={type} closable>
                <p>{message}</p>
            </Notification>
        ),
        [],
    )

    const submit = useCallback(
        async (data: unknown) => {
            const credentials = data as Omit<User, "id">

            if (typeof credentials.username !== "string" || typeof credentials.password !== "string") return

            const { username, password } = credentials
            const user = await onLogin(username, password)

            if (!user) {
                toaster.push(getMessage("error", texts["login.notification.failure"]), { placement: "topStart" })
                return
            }

            toaster.push(getMessage("success", texts["login.notification.success"]), { placement: "topStart" })

            setTimeout(() => navigate("/"), 1500)
        },
        [toaster, navigate],
    )

    return { control, errors, showPassword, handleSubmit, setShowPassword, submit }
}
