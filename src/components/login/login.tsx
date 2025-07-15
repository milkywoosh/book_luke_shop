
type login_arg = {
    arg: string,
    arg1: number,
}

const Login = ({arg, arg1}: login_arg) => {
    
    return (
        <div>
            <h1>login as {arg} with number {arg1}</h1>
        </div>
    )
}

export default Login