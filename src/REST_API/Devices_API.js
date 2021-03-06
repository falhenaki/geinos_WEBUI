import {get_creds, get_route} from "./API";

export function get_devices() {

    let route = get_route();
    let creds = get_creds();
    const devices = fetch( route + '/devices',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
    return devices;
}

export function add_device(device){
    let route = get_route();
    let creds = get_creds();
    let formdata = new FormData();
    formdata.append('vendor_id', device.name);
    formdata.append('serial_num', device.serial);
    formdata.append('model_num', device.model);
    fetch(route + '/devices', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}
