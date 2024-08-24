    const today = new Date().toISOString().split('T')[0];
    // const date = String(today.getDate());
    // const month = String(today.getMonth());
    // const year = String(today.getFullYear());
    // today = year + '-' + month + '-' + date;
    console.log(today);
    const letter = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtWwXxYyZz ';
    const number = '0123456789 ';
    let list_array = JSON.parse(localStorage.getItem('list')) || [];
    update_list();

    document.querySelector('.js-add-button').addEventListener('click', (event) => {add_details()})

    document.body.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            add_details();
        }
    })

    function update_list() {
        let html_list = '';
        for(let i = 0; i < list_array.length; i++) {
            const para_button = `
                <div>${list_array[i]['name']}</div>
                <div>${list_array[i]['date']}</div>
                <div>${list_array[i]['time']}</div>
                <button class="div-records-button">&#9747; <span class="js-delete">Delete</span>
                </button>`;
            html_list += para_button;
        }
    document.querySelector('.js-para-container').innerHTML = html_list;

    document.querySelectorAll('.div-records-button').forEach((del_bnt, index) => {
        del_bnt.addEventListener('click', () => {
            list_array.splice(index, 1);
            localStorage.setItem('list', JSON.stringify(list_array));
            update_list();
        })
    });
    }

    function add_details() {
        const name = document.querySelector('.js-title').value;
        const date = document.querySelector('.js-date').value;
        const time = document.querySelector('.js-time').value;
        if (name === '' || date === ''){
            document.querySelector('.ontype-title').innerHTML = '<span>&#40</span>Not Enough Information<span>&#41</span>';
            document.querySelector('.js-add-button').innerHTML = '<span>&#9747;</span>Canceled';

            setTimeout(() => {
                document.querySelector('.js-add-button').innerHTML = 'Add';
                document.querySelector('.ontype-title').innerHTML = '';
            }, 3000);
        }else {
            if (date < today) {
                document.querySelector('.ontype-title').value = `can't add task before ${today}`;
            } else if (date >= today) {
                let arr = {name,date,time};
                list_array = list_array.concat(arr);
                localStorage.setItem('list', JSON.stringify(list_array));

                document.querySelector('.js-add-button').innerHTML = '<span>&#8635;</span>Loading';

                setTimeout(() => {
                    document.querySelector('.js-add-button').innerHTML = '<span>&#10003;</span>Added!';
                }, 2000);

                setTimeout(() => update_list(), 3000);

                setTimeout(() => {
                    document.querySelector('.js-add-button').innerHTML = 'Add';
                }, 3000);
            }

            document.querySelector('.js-title').value = '';
            document.querySelector('.js-date').value = '';
            document.querySelector('.js-time').value = '';
            document.querySelector('.ontype-title').innerHTML = '';
        }
    }

    function delete_item(index) {
    list_array.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(list_array));
    update_list();
    }