// import React from 'react'
// import {Navigate, Route, Routes} from 'react-router-dom'
// import AuthPage from './pages/AuthPage/AuthPage'
// import RegPage from "./pages/AuthPage/RegPage";
// import AddQuiz from "./pages/MainPage/AddQuiz";
//
//
// export const useRoutes = (isLogin) => {
//     console.log('useRoutes is called')
//     if (isLogin) {
//         console.log('I am login')
//         return (
//             <Routes>
//                 <Route path="/" element={<AddQuiz/>}/>
//                 {/*<Route path="/login" element={<Navigate to="/"/>}/>*/}
//             </Routes>
//         )
//     }
//     //для коммита
//     console.log('I am not login ')
//     return (
//         <Routes>
//             <Route path="/registration" element={<RegPage/>}/>
//             <Route path="/login" element={<AuthPage/>}/>
//             <Route path="/" element={<Navigate to="/login"/>}/>
//         </Routes>
//     )
// }