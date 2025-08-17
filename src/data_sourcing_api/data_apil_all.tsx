import { base_url_dev } from "../backend_api/base_url"

const data_table_meals: string = `${base_url_dev}/meal-product/datatable`

const list_of_packages_api: string = `${base_url_dev}/list-of-packages`

const meal_detail_id: string = `${base_url_dev}/meal-detail/:id`
export {
    data_table_meals,
    list_of_packages_api,
    meal_detail_id
}