import {type RouteConfig, index, layout} from "@react-router/dev/routes";

export default [
    layout("./routes/layout/main.tsx",[
        index("routes/home/index.tsx"),
    ]),
] satisfies RouteConfig;
