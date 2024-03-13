import styled from "styled-components"

export const Page = styled.div`
    gap: 8px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    form {
        gap: 24px;
        width: 30%;
        display: flex;
        padding: 2rem;
        min-width: 400px;
        border-radius: 8px;
        align-items: start;
        flex-direction: column;
        border: 1px solid #696969;

        .rs-form-group,
        .rs-form-control,
        input {
            width: 100% !important;
            margin-bottom: 0 !important;
        }

        .visibility {
            width: 100%;
            margin-top: -20px;
            font-size: small;
        }

        button {
            margin-right: auto;
        }
    }
`
export const LoginImage = styled.img`
    width: 100%;
`
