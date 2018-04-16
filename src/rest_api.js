const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');
export function get_devices() {
    const devices = fetch( route + '/devices',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });


    return devices;
}

export function get_device_groups() {
    const devices = fetch( route + '/device_groups',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),
        });


    return devices;
}




export function add_device(device){
    const formdata = new FormData();
    formdata.append('vendor_id', device.name);
    formdata.append('serial_num', device.password);
    formdata.append('model_num', device.retypepassword);
    fetch(route + '/devices', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}


export function get_users() {
    const users = fetch( route + '/users',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
    return users;
}



export function delete_user(user){
        const formdata = new FormData();
        formdata.append('rmusr', user);
        fetch( route + '/users', {
            method: 'delete',
            body: formdata,
            headers: new Headers({
                'Authorization': creds})
        });
}

export function add_user(user){
    const formdata = new FormData();
    formdata.append('usr', user.name);
    formdata.append('password', user.password);
    formdata.append('retypepassword', user.retypepassword);
    formdata.append('email', user.email);
    formdata.append('role', user.role);
    fetch(route + '/users', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}

export function add_param(param){
    const paramdata = new FormData();
    paramdata.append('name', param.name);
    paramdata.append('type', param.type);
    paramdata.append('value', param.value);
    fetch(route + '/parameters', {
        method: 'put',
        body: paramdata,
        headers: new Headers({
            'Authorization': creds})
    });
}

export function get_param() {
    return fetch( route + '/parameters',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
}
