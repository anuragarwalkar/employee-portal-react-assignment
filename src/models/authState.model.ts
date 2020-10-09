export default interface AuthState {
    loading: boolean,
    token: string,
    userId: string,
    fullName: string
    error: string
}