import { Form, Input, InputProps } from "rsuite"

export type FieldProps = InputProps & {
    error?: unknown
    label: string
    name: string
    value: string
    onChange: (val: string) => void
}

function Field(props: FieldProps) {
    const { label, name, value, error, onChange, ...rest } = props

    return (
        <Form.Group>
            <label>{label}</label>
            <Input
                id={name}
                value={value}
                onChange={(value) => onChange(value)}
                {...rest}
            />
            <Form.ErrorMessage show={!!error} placement="bottomStart">
                {String(error)}
            </Form.ErrorMessage>
        </Form.Group>
    )
}

export default Field
