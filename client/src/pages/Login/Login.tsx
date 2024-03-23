import { Controller } from "react-hook-form"
import { Button, ButtonToolbar, Checkbox, Form, Stack } from "rsuite"

import { Field } from "../../components"
import useLogin, { userModel } from "./Login.hook"
import { LoginImage, Page } from "./Login.style"
import { texts } from "../../util"

function Login() {
    const { control, errors, showPassword, handleSubmit, setShowPassword, submit } = useLogin()

    return (
        <Page>
            <Form checkTrigger="change" model={userModel} onSubmit={(_, e) => handleSubmit(submit)(e)}>
                <Stack>
                    <h3>{texts["login.form.login.title"]}</h3>
                    <LoginImage src="/images/imagem_login.jpg" alt="pensar" />
                </Stack>

                <Controller
                    name="username"
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
                            label={texts["login.form.username.label"]}
                            placeholder={texts["login.form.username.placeholder"]}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        minLength: 6,
                        min: texts["login.form.password.length"],
                        required: texts["login.form.password.required"],
                    }}
                    render={({ field }) => (
                        <Field
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors[field.name]?.message}
                            type={showPassword ? "text" : "password"}
                            label={texts["login.form.password.label"]}
                            placeholder={texts["login.form.password.placeholder"]}
                        />
                    )}
                />

                <span className="visibility">
                    <Checkbox onChange={(_, checked) => setShowPassword(checked)} checked={showPassword} />
                    <label>{texts["login.form.password.display"]}</label>
                </span>

                <ButtonToolbar>
                    <Button appearance="primary" type="submit" role="submit">
                        {texts["login.form.login"]}
                    </Button>
                </ButtonToolbar>
            </Form>
        </Page>
    )
}

export default Login
