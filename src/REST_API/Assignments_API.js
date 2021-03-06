import {get_route, get_creds} from "./API";


export function assign(assign_data){
    let route = get_route();
    let creds = get_creds();
    const assign = new FormData();
    assign.append('temp_name', assign_data.temp_name);
    assign.append('group_name', assign_data.group_name);

    fetch(route + '/assign', {
        method: 'post',
        body: assign,
        headers: new Headers({
            'Authorization': creds})
    });
}