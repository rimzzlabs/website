import type { Dictionary } from "./en";

// Indonesian translations. Prose (hero, archive, now narratives) is a best-effort
// translation — worth a native review pass.
export const id: Dictionary = {
	htmlLang: "id",
	ogLocale: "id_ID",
	dateLocale: "id-ID",

	nav: {
		home: "Beranda",
		notes: "Catatan",
		now: "Now",
		dragToMove: "Geser untuk memindahkan",
		hideDock: "Sembunyikan dock",
		pages: "Halaman",
		availablePages: "Halaman Tersedia",
		preferences: "Preferensi",
		theme: { label: "Tema", system: "Sistem", light: "Terang", dark: "Gelap" },
		animations: { label: "Animasi", system: "Sistem", on: "Aktif", off: "Mati" },
		language: { label: "Bahasa", en: "Inggris", id: "Indonesia" },
		connect: {
			trigger: "Hubungi saya",
			scheduleCall: "Jadwalkan panggilan",
			sendEmail: "Kirim email",
		},
	},

	contact: {
		title: "Kirim saya email",
		description:
			"Lebih suka asinkron? Kirim pesan dan saya akan membalasnya. Saya hanya butuh email asli agar bisa membalas.",
		nameLabel: "Nama",
		namePlaceholder: "Budi Perkasa",
		emailLabel: "Email",
		emailPlaceholder: "budi@acme.com",
		subjectLabel: "Subjek",
		subjectPlaceholder: "mis: Peluang Kerja",
		messageLabel: "Pesan",
		messagePlaceholder: "Halo Rizki, saya ingin membahas peluang...",
		toolbar: {
			bold: "Tebal",
			italic: "Miring",
			bulletList: "Daftar poin",
			orderedList: "Daftar bernomor",
		},
		send: "Kirim",
		sending: "Mengirim…",
		cancel: "Batal",
		understood: "Tutup",
		successTitle: "Pesan terkirim",
		successBody: "Terima kasih sudah menghubungi. Saya akan segera membalas email Anda.",
		errorTitle: "Terjadi kesalahan",
		errorBody: "Pesan Anda gagal terkirim. Silakan coba lagi sebentar.",
		turnstilePending: "Silakan selesaikan verifikasi di bawah.",
		validation: {
			name: "Silakan masukkan nama Anda.",
			email: "Silakan masukkan email yang valid.",
			subject: "Silakan masukkan subjek.",
			message: "Silakan tulis pesan.",
		},
	},

	footer: {
		connect: "Berteman",
		resource: "Sumber",
		resume: "Résumé",
		sourceCode: "Kode Sumber",
	},

	homeSeo: {
		title: "Rizki Citra, Software Engineer",
		description:
			"Situs pribadi Rizki Citra, software engineer yang membangun produk yang intuitif; yang cepat serta menyenangkan — plus catatan seputar perangkat lunak.",
	},

	hero: {
		srName: "Rizki Citra,",
		titleLead: "Seorang Insinyur Prangkat Lunak. Pengembang UI Intuitif.",
		srUi: "",
		titleUi: "",
		srWhy: "Kenapa rekayasa perangkat lunak? ",
		p1: "Rekayasa perangkat lunak memungkinkan saya menciptakan solusi inovatif yang selaras dengan nilai-nilai saya dan memberi dampak yang berarti.",
		p2: "Perpaduan antara struktur, pemecahan masalah, dan evolusi yang terus berlanjut membuat saya tetap aktif dan tumbuh.",
		talk: "Mari Bicara",
		talkSr: "(Memungkinkan Anda menjadwalkan pertemuan dengan Rizki atau mengirim email)",
		talkMenu: {
			callLabel: "Panggilan 15-30 menit",
			scheduleCall: "Jadwalkan panggilan",
			scheduleCallSr: "(via cal.com)",
			asyncLabel: "Lebih suka asinkron?",
			sendEmail: "Kirim saya email",
		},
		resume: "Résumé",
		resumeSr: "Lihat ",
	},

	experience: {
		heading: "Pengalaman",
		headingSr: "",
		intro:
			"Catatan singkat tentang tempat saya bekerja dan apa yang saya kerjakan. Cerita lengkapnya ada di bawah.",
		resumeLead: "Anda bisa melihat profil lengkapnya di",
		resumeLink: "Résumé saya",
		resumeLinkSr: "Lihat di sini",
		items: {
			kolosal: {
				title: "Software Engineer",
				period: "Nov 2025 - Sekarang",
				summary: "Membangun produk AI bersama tim kecil yang tajam.",
			},
			bitwyre: {
				title: "Software Engineer (Frontend)",
				period: "Feb 2024 - Nov 2025",
				summary: "Mengembangkan frontend untuk platform kripto, web3, dan trading global.",
			},
			"skyshi-fe": {
				title: "Frontend Developer",
				period: "Apr 2022 - Feb 2024",
				summary:
					"Membangun aplikasi Web yang cepat dan intuitif untuk klien lokal maupun internasional.",
			},
			"skyshi-intern": {
				title: "Frontend Developer Intern",
				period: "Jan 2022 - Mar 2022",
				summary: "Mengasah kemampuan pada produk internal dengan React, Vue, dan Chakra UI.",
			},
		},
	},

	skill: {
		heading: "Keahlian",
		headingSr: "",
		p1: "Tools datang dan pergi, dan sesekali sesuatu yang baru membuat keahlian lama usang. Saya belajar untuk tidak terlalu terpaku pada itu.",
		p2: "Yang membuat saya terus tumbuh adalah rasa ingin tahu — mendalami hal yang penting sambil tetap cukup leluasa untuk beradaptasi, serta kebiasaan bertumbuh apa pun yang akan datang kedepannya.",
		domains: {
			Frontend: "Frontend",
			Backend: "Backend",
			"General Tooling": "General Tooling",
			"Agentic Coding": "Agentic Coding",
		},
	},

	homeNotes: {
		heading: "Catatan",
		headingSr: "Baca ",
		intro:
			"Beberapa hal yang saya pelajari kadang saya tulis disini. Walaupun kadang tidak sempat untuk menulis semuanya.",
		readAll: "Baca semua catatan",
	},

	archive: {
		heading: "Arsip",
		headingSr: "Perjalanan Saya di Rekayasa Perangkat Lunak - ",
		intro:
			"Saya memulai perjalanan di software pada tahun 2019, dan sejak itu saya selalu ingin menciptakan karya yang berarti. Tapi masih banyak yang bisa dikenang.",
		timeline: {
			"2026": {
				title: "Sekarang",
				descriptions: [
					"Saya masih di Kolosal AI, semakin dalam membangun produk AI. Setelah bertahun-tahun di web lalu kripto, ini adalah ruang yang paling cepat bergerak yang pernah saya geluti; rasanya berbenah setiap beberapa bulan.",
					"Tidak ada rangkuman rapi untuk babak yang masih ditulis. Untuk sekarang saya fokus penuh: mengerjakan yang baik, belajar cepat, dan melihat ke mana arahnya.",
				],
				photoAlts: [],
			},
			"2025": {
				title: "Kolosal AI",
				descriptions: [
					"Sekitar bulan November, saya bergabung dengan Kolosal AI, menuju sesuatu yang baru: Akal Imitasi atau AI. Sebuah lompatan (lagi), menukar bidang yang sudah saya kuasai dengan yang bergerak pada kecepatan informasi yang sangat berbeda.",
					"Minggu-minggu pertama adalah soal menemukan sesuatu yang searah bersama tim yang benar-benar hebat.",
				],
				photoAlts: [],
			},
			"2024": {
				title: "Bitwyre",
				descriptions: [
					"Sejak 2023 lalu, saya sebenarnya sudah tertarik pada kripto, web3, dan trading, saya selalu banyak bertanya kepada teman yang sudah lama berkecimpung di bidang itu. Pada Februari 2024 saya meninggalkan Skyshi Digital Indonesia untuk mencari sesuatu yang baru dibidang software.",
					"Keesokan harinya, teman saya mengenalkan saya ke Bitwyre, perusahaan kripto, web3, dan trading. Saya langsung melamar, interview dengan CTO dan CEO mereka, dan bergabung dengan tim Engineering sebagai Software Engineer (Frontend).",
					"Bitwyre adalah dunia yang berbeda, dengan rekan dari Kanada, AS, India, Eropa, dan lainnya. Bahasa Inggris adalah bahasa ketiga saya, tapi itu tidak pernah menghalangi proses saya dalam membangun produk bersama dengan lintas zona waktu.",
					"Pada bulan Agustus itu kami terbang ke Coinfest Asia di Bali, event yang memadukan konferensi dengan hackathon internal kecil di sebuah vila.",
					"Menjelang akhir 2024 saya juga lulus dari kuliah di AMIK Serang, menutup babak perkuliahan. Bukan kampus terbesar atau paling bergengsi, tapi memberi saya fondasi untuk berkembang dan keyakinan untuk terus maju.",
				],
				photoAlts: [
					"Festival pass Rizki untuk Coinfest Asia",
					"Rizki bersama maskot Indodax",
					"Rizki bersama tim Bitwyre",
					"Potret Rizki bersama tim Mandala Chain",
					"Mewawancarai toko lokal untuk tugas akhir Rizki",
					"Potret kelulusan Rizki bersama ibu dan adiknya",
				],
			},
			"2023": {
				title: "Work-Life Balance",
				descriptions: [
					"Saya terus bekerja sebagai Frontend Developer di Skyshi. Yang paling menonjol adalah moladinfinance.com untuk Moladin, dirilis sekitar lima minggu setelah commit pertama, diikuti serangkaian proyek klien yang terikat NDA.",
					"Di sela itu, saya membangun ulang PC rakitan saya secara bertahap. Setelah setahun hanya dengan laptop, kembali ke setup yang layak dengan layar lebih besar dan ergonomi terasa seperti kemewahan.",
					"Saya menyeimbangkan pekerjaan penuh waktu, kuliah, dan sedikit freelance Facebook bersama teman, menyelesaikan proyek-proyek itu dalam tiga bulan tanpa ada yang terbengkalai. Mengingatnya kembali, saya pun heran betapa banyak yang terjadi hanya dalam setahun.",
				],
				photoAlts: [
					"Komponen rakitan PC kedua Rizki",
					"Rakitan PC kedua Rizki, di samping laptop",
					"Dual-boot Windows dengan EndeavourOS",
					"Rakitan PC kedua Rizki, tampilan akhir",
				],
			},
			"2022": {
				title: "Kuliah + Full Time",
				descriptions: [
					"Akhir Desember 2021 saya diterima sebagai magang di Skyshi Digital Indonesia, sebuah perusahaan software yang berlokasikan di Gamping, Yogyakarta. Kami bekerja sepenuhnya remote, karena sudah menjadi kebiasaan pasca pandemi.",
					"Minggu-minggu pertama menegangkan tanpa pengalaman profesional sama sekali, tapi saya cepat menemukan ritme team, ikut berkontribusi pada gethired.id, platform internal untuk melatih keterampilan siap kerja.",
					"Tiga bulan kemudian, mereka mempekerjakan saya penuh waktu sebagai Frontend Developer dan memindahkan saya ke proyek eksternal yang sering terikat NDA. Dari magang menjadi karyawan tetap adalah tonggak karier pertama saya, diraih sambil mengikuti perkuliahan karyawan.",
				],
				photoAlts: ["Setup laptop Rizki di kafe dengan es kopi", "Potret Rizki bekerja dari kafe"],
			},
			"2021": {
				title: "Akademik",
				descriptions: [
					"Ini tahun saya mulai serius dengan software. Keadaan waktu itu masih pandemi, saya mendalami dasar-dasar HTML, CSS, dan JavaScript lewat belajar mandiri dan apa pun yang bisa saya temukan online.",
					"Pada Mei waktu itu jelas: pengetahuan tanpa pengalaman formal ternyata menyulitkan untuk diterima kerja. Maka saya ikut pada struktur, dan akhir 2021 saya diterima di AMIK Serang, perguruan tinggi tingkat D3.",
					"Di sela kuliah, saya terus merilis proyek-proyek kecil agar tetap mengasah skill. Setahun disiplin yang mengasah fondasi bagi hal yang akan datang setelahnya.",
				],
				photoAlts: ["Swafoto Rizki, jaket masih basah usai hujan", "Laptop pertama Rizki"],
			},
			"2020": {
				title: "Pandemi",
				descriptions: [
					"Sudah sekitar satu tahun sejak pandemi, rumah menjadi ruang kelas pribadi. di tahun terakhir saya ketika SMK, Saya banyak menghabiskan waktu didepan komputer.",
					"Disisi lain saya juga mengambil pekerjaan sampingan dan pekerjaan kecil-kecilan demi bisa makan dan menghidupi keseharian saya.",
				],
				photoAlts: [
					"Sebuah keyboard dan mouse",
					"Rakitan PC pertama Rizki dengan wallpaper anime",
					"Setup rakitan PC pertama Rizki",
				],
			},
			"2019": {
				title: "Kala Itu",
				descriptions: [
					"Mengingatnya kembali, ini tahun-tahun yang indah. Bahkan saat pandemi mulai merayap, ini salah satu masa paling membentuk yang pernah saya alami. Saya belajar Rekayasa Perangkat Lunak di SMKN 8 Pandeglang, dan di sanalah membangun software pertama kali terasa menyenangkan.",
					"Tantangannya, kurikulum tertinggal bertahun-tahun dari yang dipakai industri, jadi saya belajar sisanya sendiri dari YouTube dan sumber gratis online, membangun kebiasaan belajar mandiri yang membawa saya sampai sekarang.",
				],
				photoAlts: ["Suasana ruang kelas", "Laboratorium komputer di masa itu"],
			},
		},
	},

	now: {
		seoTitle: "Saat Ini",
		seoDescription:
			"Kebanyakan situs punya halaman /about. Ini halaman /now saya, potret apa yang sedang saya fokuskan pada titik ini dalam hidup saya. Terinspirasi dari nownownow.com.",
		heading: "Apa yang Sedang Saya Kerjakan",
		introLead:
			"Kebanyakan situs punya halaman /about. Ini halaman /now saya — potret apa yang sedang saya fokuskan pada titik ini dalam hidup saya. Terinspirasi dari",
		items: {
			"2026-07-04": {
				title: "Membangun ATS resume builder sumber terbuka",
				description:
					"Di luar pekerjaan saya di Kolosal AI, saya sedang membangun Lanjut — resume builder sumber terbuka yang ramah sistem ATS. Kodenya tersedia di GitHub.",
				link: "https://github.com/rimzzlabs/lanjut",
			},
			"2026-06-30": {
				title: "Membangun kanvas interaktif dengan SpacetimeDB",
				description:
					"Merancang frontend untuk aplikasi kompleks yang memadukan kanvas interaktif real-time dengan AI.",
			},
			"2025-12-02": {
				title: "Membangun sesuatu yang berkaitan dengan AI",
				description:
					"Saat ini sedang membangun sesuatu yang berkaitan dengan AI di Kolosal AI, orang-orang di sini luar biasa. Saya rasa akan menulis beberapa catatan tentangnya nanti.",
			},
		},
	},

	notesPage: {
		seoTitle: "Catatan",
		title: "Catatan",
		description:
			"Catatan tentang apa yang saya pelajari dan bagaimana saya mempelajarinya sebagai insinyur — problem solving, pembahasan teknis mendalam, dan sesekali resep praktis.",
		publishedOn: "Diterbitkan pada",
		writtenBy: "Ditulis oleh",
		onThisPage: "Di halaman ini",
		notTranslated:
			"Catatan ini belum tersedia dalam bahasa Indonesia — menampilkan versi bahasa Inggris.",
	},

	notFound: {
		seoTitle: "404 — Halaman tidak ditemukan",
		description: "Halaman yang Anda cari tidak ada, atau mungkin telah dipindahkan.",
		heading: "Halaman tidak ditemukan",
		backHome: "Kembali ke beranda",
		orHeadTo: "Atau menuju ke",
	},

	noteNotFound: {
		seoTitle: "404 — Catatan tidak ditemukan",
		description: "Rizki belum menulis catatan ini, atau catatan ini telah diarsipkan atau dihapus.",
		heading: "Catatan tidak ditemukan",
		didYouMean: "Mungkin maksud Anda",
	},
};
