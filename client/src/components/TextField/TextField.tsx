import { Form, FormControlProps } from "rsuite"

export type TextFieldProps = FormControlProps & {
    label: string
    type?: string
}

function TextField(props: TextFieldProps) {
    const { name, label, accepter, ...rest } = props

    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    )
}

export default TextField
