import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("./routes/layout/main.tsx", [
        index("routes/home/index.tsx"),
        route("categories/:id/:name", "routes/category/details.tsx"),
        route("products/:id", "routes/product/details.tsx"),
        route("/admin/categories/:id/edit", "routes/admin/category/edit.tsx"),
        route("/admin/categories/create", "routes/admin/category/create.tsx")
    ]),
    layout("./routes/layout/dashboard.tsx", [
        route("/admin/categories", "routes/admin/category/index.tsx"),
        route("/admin/products", "routes/admin/product/index.tsx"),
    ])
] satisfies RouteConfig;
