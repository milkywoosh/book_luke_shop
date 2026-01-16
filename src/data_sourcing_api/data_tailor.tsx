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

export const formatter = (rawDate: string) => new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(new Date(rawDate))

type detailPhoto = {
    id: number
    username: string
    src_photo: string // url photo
}

export interface DatatableResponse<T> {
    body: T;           // This will be your orderTailorT[]
    status: number;
    message: string;
    // Add other consistent metadata here
}


export interface ApiResponse<T> {
    status: number;
    message: string;
    body: T; // This is where your data actually lives
}

export type orderTailorT = {
    dt_row_index: number;
    id: string;
    order_number: string;
    start_process: string;
    full_name: string;
    phone_number: string;
    service_type: string;
    status_progress: string;
    queue: number;
    total_price: number;
    photos: detailPhoto[];
};


export const MOCK_ORDERS_TAILOR: orderTailorT[] = [
    {
        dt_row_index: 1,
        id: '101',
        order_number: "ASD001",
        start_process: formatter(new Date().toString()),
        full_name: 'Rina',
        phone_number: '081234',
        service_type: serviceType.DressPatch,
        status_progress: statusProgress.ProsesPengerjaan,
        queue: 1,
        total_price: 50,
        photos: [
            { id: 1, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 2, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 3, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 4, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 5, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }
        ]
    },
    {
        dt_row_index: 2,
        id: '102',
        order_number: "ASD002",
        start_process: formatter(new Date().toString()),
        full_name: 'Rina',
        phone_number: '081234',
        service_type: serviceType.DressPatch,
        status_progress: statusProgress.ProsesPengerjaan,
        queue: 1,
        total_price: 50,
        photos: [
            { id: 1, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 2, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 3, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 4, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' },
            { id: 5, username: '081234', src_photo: 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }
        ]
    },
];