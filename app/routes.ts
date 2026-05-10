import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("./routes/layout/main.tsx",[
        index("routes/home/index.tsx"),
        route("categories/:id/:name","routes/category/details.tsx"),
    ]),
] satisfies RouteConfig;
