import { lazy } from "react";
import { Route } from "react-router-dom";


const Routes = [
    {
        path: '',
        element: lazy(() => import('./../Pages/HomeTemplates/HomeTemplates')),
        nested: [
            {
                path: '',
                element: lazy(() => import('./../Pages/HomeTemplates/HomePage/HomePage'))
            },
            {
                path: '/detail/:image_id',
                element: lazy(() => import('./../Pages/HomeTemplates/Detail/Detail'))
            },
            {
                path: '/info',
                element: lazy(() => import('./../Pages/HomeTemplates/Info/InfoUser'))
            },
            {
                path: '/create-image',
                element: lazy(() => import('./../Pages/HomeTemplates/Create/CreateImage'))
            }
        ]   
    },
    {
        path: '/login',
        element: lazy(() => import('./../Pages/Login/Login'))
    },
    {
        path: '/sign-up',
        element: lazy(() => import('./../Pages/Register/Register'))
    }
]



const renderRoutes = () => {
    return Routes.map((route, index) => {
        if (route.nested) {
            return <Route key={index} path={route.path} element={<route.element />}>
                {route.nested.map((item, i) => {
                    if (item.nested) {
                        return <Route key={i} path={item.path} element={<item.element />}>
                            {item.nested.map((child, ii) => {
                                return <Route key={ii} path={child.path} element={<child.element />}>

                                </Route>
                            })}
                        </Route>
                    } else {
                        return <Route key={i} path={item.path} element={<item.element />}>

                        </Route>
                    }
                })}
            </Route>
        } else {
            return <Route key={index} path={route.path} element={<route.element />}>

            </Route>
        }
    })
}

export default renderRoutes;