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

const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

export const MOCK_ORDERS_TAILOR = [
    { id: '101', start: formatter.format(new Date()), customer: 'Rina', phone: '081234', type: 'Dress Patch', status: statusProgress.ProsesPengerjaan, queue: 1, price: 50, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '102', start: formatter.format(new Date()), customer: 'Maya', phone: '085678', type: 'School Uniform', status: statusProgress.DalamAntrian, queue: 2, price: 150, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: 'Wedding Gown', status: statusProgress.Fitting, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: 'Wedding Gown', status: statusProgress.SudahDiambilCust, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: 'Wedding Gown', status: statusProgress.Selesai, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: 'Wedding Gown', status: statusProgress.DalamAntrian, queue: 3, price: 1200, photos: [{ id: 1, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 2, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }, { id: 3, 'username': '081234', 'src_photo': 'https://cdn2.thedogapi.com/images/HyWGexcVQ_1280.jpg' }] },
    { id: '103', start: formatter.format(new Date()), customer: 'Siti', phone: '089999', type: 'Wedding Gown', status: statusProgress.Fitting, queue: 3, price: 1200, photos: [] },
];