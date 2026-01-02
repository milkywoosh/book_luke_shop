

import {
    // Search,
    MessageCircle,
    Camera,
    ChevronRight,

} from 'lucide-react';

// --- CUSTOMER DETAIL VIEW (The 5-10 Photo Requirement) ---

function CustomerDetailView({ order, onBack }: any) {

    // call API IMAGE 
    // by username USER

    // array of object, list of photo


    // const images = Array(order.photos || 1).fill('https://cdn.thedogapi.com/images/BJa4kxc4X.jpg').slice(0, 4);
    const images = order.photos ?? [];

    console.log("images: ", images)

    return (
        <div className="space-y-6 w-[400px]">
            <button onClick={onBack} className="text-sm font-bold flex items-center gap-1 text-gray-500">
                <ChevronRight className="rotate-180" size={16} /> BACK
            </button>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-black">{order.type}</h2>
                        <p className="text-blue-600 font-bold">{order.status}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-xl text-center min-w-[80px]">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Queue</p>
                        <p className="text-2xl font-black">#{order.queue}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                        <Camera size={20} />
                        <span>Progress Photos</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[...images].map((src, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                                <img src={src?.src_photo} loading="lazy" alt="Progress" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                    <a
                        href={`https://wa.me/yournumber?text=Hi, I have a question about my ${order.type} (#${order.id})`}
                        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                    >
                        <MessageCircle size={20} />
                        CHAT WITH TAILOR
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetailView;