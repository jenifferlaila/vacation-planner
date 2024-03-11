import { ArrowLeftLine, WarningRound } from "@rsuite/icons"

import { Page } from "./NotFound.style"
import { texts } from "../../util"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <Page>
            <div>
                <WarningRound />
                <span>{texts["404.title"]}</span>
            </div>

            <Link to="/">
                <ArrowLeftLine /> {texts["404.link"]}
            </Link>
        </Page>
    )
}

export default NotFound
