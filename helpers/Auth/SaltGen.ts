import bcrypt from "bcryptjs"
// const password:string = "Manish1@"
const Hasher = async (password: string) => {
    // console.log(password)
    // const salt: string = await bcrypt.genSalt(10)
    const hash: string = await bcrypt.hash(password, 10)
    // console.log(hash)
    return hash
}

export default Hasher;