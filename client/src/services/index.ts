import axios from "axios"
import { DateRange } from "../util"

export type User = {
    id: string
    username: string
    password: string
}

export type PublicUser = Omit<User, "password"> & {
    name: string
}

export type CommonFields = {
    id: string
    start: Date
    title: string
    creator: string
    participants: string[]
}

export type Vacation = CommonFields & {
    finish: Date
    location?: string
}

export type Event = CommonFields & {
    vacation_id: string
}

export type EventParticipant = {
    id: string
    user: string
    event: string
}

export type VacationEventsInformation = Omit<Vacation, "id"> & {
    events: Omit<Event, "id">[]
}

const API_HOST =
    import.meta.env.DEV && import.meta.env.VITE_USE_LOCAL_API !== "false"
        ? "http://localhost:3001"
        : import.meta.env.VITE_API_ROOT_URL

const getApiHost = () => {
    if (API_HOST) return API_HOST

    throw new Error("Revise your env variables")
}

const eventParticipantsUrl = (id: number | string) =>
    `${getApiHost()}/event/${id}/participants`

export async function authUser(
    username: string,
    password: string,
): Promise<User | undefined> {
    const url = `${getApiHost()}/auth`

    try {
        const res = await axios({
            method: "POST",
            url,
            data: { username, password },
            headers: {},
        })

        if (res.status >= 300) return undefined

        return res.data as User
    } catch (e) {
        return undefined
    }
}

export async function login(username: string, password: string) {
    const user = await authUser(username, password)

    if (!user) return undefined

    try {
        localStorage.setItem("user", JSON.stringify({ ...user, password }))
    } catch (e) {
        console.error(e)
    }

    return user
}

export async function getVacationByUserId(id: string) {
    const url = `${getApiHost()}/user/${id}/vacation`

    try {
        const res = await axios({ method: "GET", url })

        if (res.status >= 300) return undefined

        return res.data as Vacation
    } catch (_) {
        return undefined
    }
}

export async function getEventsByVacationId(id: string) {
    const url = `${getApiHost()}/vacation/${id}/events`

    try {
        const res = await axios({ method: "GET", url })

        if (res.status >= 300) return []

        const events: Event[] = []

        for (const { id, ...event } of res.data as Event[]) {
            const res = await axios({
                method: "GET",
                url: eventParticipantsUrl(id),
            })

            if (!res) {
                events.push({ ...event, id, participants: [] })
                continue
            }

            events.push({
                ...event,
                id,
                participants: (res.data as EventParticipant[]).map(
                    ({ user }) => user,
                ),
            })
        }

        return events
    } catch (_) {
        return []
    }
}

export async function pickUsers() {
    const url = `${getApiHost()}/users`
    try {
        const res = await axios({ method: "GET", url })

        if (res.status >= 300) return []

        return res.data as PublicUser[]
    } catch (_) {
        return []
    }
}

export async function saveVacation(
    user: User,
    range: DateRange,
    events: Omit<Event, "id">[],
    participants: string[],
) {
    const url = `${getApiHost()}/vacation`

    if (!range) return undefined

    const data: VacationEventsInformation = {
        creator: user.id,
        title: "",
        start: range[0],
        finish: range[1],
        events,
        participants,
    }

    try {
        const res = await axios({
            method: "POST",
            url,
            data,
            headers: {},
        })

        if (res.status >= 300) return undefined

        return res.data as User
    } catch (e) {
        return undefined
    }
}
