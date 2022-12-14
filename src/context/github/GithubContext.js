import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {

    // Set initial state
    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    // Define the reducer function that accept 2 parameters i.e the reducer in use and the initial state
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Fetch random users for testing purposes
    const fetchUsers = async() => {
        setLoading();
        
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })
    
        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Get search results
    const searchUsers = async(text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        })
        
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })
    
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get single user
    const getUser = async(login) => {
        setLoading();
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })

        if(response.status === 404){
            window.location =  '/notfound';
        }
    
        const data = await response.json()

        dispatch({
            type: 'GET_USER',
            payload: data
        })
    }
    
    // Set loading dispatch
    const setLoading = () => {
        dispatch({
            type: "SET_LOADING"
        })
    }

    // Clear users
    const clearUsers = ()=> {
        dispatch({
            type: "CLEAR_USERS"
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        fetchUsers,
        clearUsers,
        getUser
        }}>
        {children}
    </GithubContext.Provider>
}


export default GithubContext