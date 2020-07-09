import orderCards from './OrderCard'
import login from './Pages/Login'
import administrators from './Pages/Administrators'
import customers from './Pages/Customers'
import dispatch from './Pages/Dispatch'
import dispatchBoard from './Pages/DispatchBoard'
import experts from './Pages/Experts'
import home from './Pages/Home'
import locations from './Pages/Locations'
import percentage from './Pages/Percentage'
import reservationList from './Pages/ReservationList'
import error404 from './ErrorPages/Error404'
import forms from "./Forms";
import tags from "./Tags";
import tables from "./Tables";
import list from "./Lists";
import menuBar from "./MenuBar";

export default {
    ...orderCards,
    ...list,
    ...forms,
    ...tags,
    ...menuBar,
    ...tables,
    pages: {
        login,
        administrators,
        customers,
        dispatch,
        dispatchBoard,
        experts,
        home,
        locations,
        percentage,
        reservationList,
    },
    errorPages: {
        error404
    }
}