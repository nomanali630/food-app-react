import axios from 'axios'
import {useHistory} from 'react-router-dom'

function Logout() {


    const history = useHistory()


    function logout() {
        axios({
            methid: "post",
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            if(response.status === 200 ){
                console.log(response)
                history.push('./login')
            }
        }).catch((error) => {
            console.log(error)
        })
        return false
    }

    return (
        <>
            <span onClick={logout} className="btn btn-outline-success my-2 my-sm-0 ">
                Logout
            </span>
        </>
    )
}


export default Logout; 
