export type statusConditionT = {
    ProsesPengerjaan: string
    DalamAntrian: string
    Fitting: string
    Selesai: string
    SudahDiambilCust: string
}

const statusProgress: statusConditionT = {
    Fitting: "Fitting Ukuran",
    DalamAntrian: "Dalam Antrian",
    ProsesPengerjaan: "Proses Pengerjaan",
    Selesai: "Selesai Pengerjaan",
    SudahDiambilCust: "Sudah diambil Pelanggan"
}

type serviceTypeT = {
    DressPatch: string
    DesignAndCreate: string
    NotCategorized: string
}

const serviceType: serviceTypeT = {
    DressPatch: "Dress Patch",
    DesignAndCreate: "Design dan Membuat Baju",
    NotCategorized: "Belum ada kategori"
}

const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

type detailPhoto = {
    id: number
    username: string
    src_photo: string // url photo
}

type orderTailorT = {
    id : string
    order_number: string
    start : string
    customer: string
    phone: string
    type : string
    status: string
    queue: number
    price: number
    photos: detailPhoto[]
}

export const MOCK_ORDERS_TAILOR: orderTailorT[] = [
    {
        id: '101',
        order_number: "ASD001",
        start: formatter.format(new Date()),
        customer: 'Rina',
        phone: '081234',
        type: serviceType.DressPatch,
        status: statusProgress.ProsesPengerjaan,
        queue: 1,
        price: 50,
        photos: [
            { id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 4, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 5, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }
        ]
    },
    { id: '102', order_number: "ASD0012", start: formatter.format(new Date()), customer: 'Maya', phone: '085678', type: serviceType.DesignAndCreate, status: statusProgress.DalamAntrian, queue: 2, price: 150, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', order_number: "ASD0013", start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: serviceType.DesignAndCreate, status: statusProgress.Fitting, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', order_number: "ASD0014", start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: serviceType.DesignAndCreate, status: statusProgress.SudahDiambilCust, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', order_number: "ASD0015", start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: serviceType.DesignAndCreate, status: statusProgress.Selesai, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', order_number: "ASD0016", start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: serviceType.DesignAndCreate, status: statusProgress.DalamAntrian, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', order_number: "ASD0017", start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: serviceType.DesignAndCreate, status: statusProgress.Fitting, queue: 3, price: 1200, photos: [] },
];