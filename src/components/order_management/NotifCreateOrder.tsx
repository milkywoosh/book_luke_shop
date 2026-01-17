import PopUp from "../pop_up/PopUpBasic";

const NotifCreateOrder = (message: string, onClose: () => void) => {

    return (
        <div
            className="">
            {/*
                NOTE: notif POP UPjika sukses atau gagal
                MUNCULKAN hanya pada sebagian di tengah halaman, tanpa menghilangkan tampilan belakang
                 
                selelah selesai dan sukses, DIRECT ke dashboard

                ===================
                +                 +
                +                 +
                +                 +
                +                 +
                +                 +
                ===================
                
             */}

            <PopUp message={message} onClose={onClose} />
        </div>
    );
}

export default NotifCreateOrder;