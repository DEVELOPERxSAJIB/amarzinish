import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import adminRoutes from './adminRoutes';


const router = createBrowserRouter([...publicRoutes,...privateRoutes,...adminRoutes]);

export default router;
