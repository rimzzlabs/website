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
		now: "Saat Ini",
		dragToMove: "Geser untuk memindahkan",
		hideDock: "Sembunyikan dock",
		pages: "Halaman",
		availablePages: "Halaman Tersedia",
		preferences: "Preferensi",
		theme: { label: "Tema", system: "Sistem", light: "Terang", dark: "Gelap" },
		animations: { label: "Animasi", system: "Sistem", on: "Aktif", off: "Nonaktif" },
		language: { label: "Bahasa", en: "Inggris", id: "Indonesia" },
		connect: { trigger: "Hubungi saya", scheduleCall: "Jadwalkan panggilan", resume: "Résumé" },
	},

	footer: {
		connect: "Terhubung",
		resource: "Sumber",
		resume: "Résumé",
		sourceCode: "Source Code",
	},

	homeSeo: {
		title: "Rizki Citra, Software Engineer",
		description:
			"Rekayasa perangkat lunak memungkinkan saya menciptakan solusi yang berdampak dan inovatif, selaras dengan nilai-nilai saya serta memperbaiki kehidupan. Terstruktur, memuaskan, dan terus berkembang—membuat semuanya tetap menarik dan penuh pertumbuhan.",
	},

	hero: {
		srName: "Rizki Citra,",
		titleLead: "Seorang Software Engineer. Merancang UI yang menyenangkan.",
		srUi: "",
		titleUi: "",
		srWhy: "Kenapa rekayasa perangkat lunak? ",
		p1: "Rekayasa perangkat lunak memungkinkan saya menciptakan solusi inovatif yang selaras dengan nilai-nilai saya dan memberi dampak yang berarti.",
		p2: "Perpaduan antara struktur, pemecahan masalah, dan evolusi yang terus berlanjut membuat saya tetap terlibat dan bertumbuh.",
		talk: "Mari Bicara",
		talkSr: "(Memungkinkan Anda menjadwalkan pertemuan dengan Rizki di cal.com)",
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
					"Membangun aplikasi React dan Next.js yang cepat dan aksesibel untuk klien lokal maupun internasional.",
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
		p1: "Tools datang dan pergi, dan sesekali sesuatu yang baru menjanjikan untuk membuat keahlian ini usang. Saya belajar untuk tidak meremehkannya.",
		p2: "Yang membuat saya terus maju adalah rasa ingin tahu—mendalami yang penting sambil tetap cukup luas untuk beradaptasi, serta kebiasaan bertumbuh bersama apa pun yang datang berikutnya.",
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
			"Beberapa hal yang saya tulis saat membangun untuk web — dan apa yang saya pelajari di sepanjang jalan.",
		readAll: "Baca semua catatan",
	},

	archive: {
		heading: "Arsip",
		headingSr: "Perjalanan Saya di Rekayasa Perangkat Lunak - ",
		intro:
			"Saya memulai perjalanan rekayasa perangkat lunak pada 2019, dan sejak itu saya selalu bersemangat menciptakan karya yang berarti. Tapi masih banyak yang bisa dikenang.",
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
					"Sekitar November saya bergabung dengan Kolosal AI dan keluar dari dunia kripto dan web3 menuju sesuatu yang baru: kecerdasan buatan. Lompatan lagi, menukar bidang yang sudah saya kuasai dengan yang bergerak pada kecepatan yang sama sekali berbeda.",
					"Minggu-minggu pertama adalah soal menemukan pijakan bersama tim yang benar-benar hebat, di ruang yang sebelumnya hanya saya amati dari luar. Cepat terasa seperti tempat yang saya harapkan. Lebih lanjut lain kali.",
				],
				photoAlts: [],
			},
			"2024": {
				title: "Bitwyre",
				descriptions: [
					"Saya tertarik pada kripto, web3, dan trading sejak akhir 2023, banyak bertanya kepada teman yang sudah lama berkecimpung di bidang itu. Pada Februari 2024 saya meninggalkan Skyshi Digital Indonesia untuk mencari sesuatu yang baru.",
					"Keesokan harinya, teman yang sama mengenalkan saya ke Bitwyre, perusahaan kripto, web3, dan trading. Saya langsung melamar, berwawancara dengan CTO dan CEO mereka, dan bergabung dengan tim Engineering sebagai Software Engineer (Frontend). Minat pribadi diam-diam menjadi profesi.",
					"Bitwyre adalah dunia yang berbeda, dengan rekan dari Kanada, AS, India, Eropa, dan lainnya. Bahasa Inggris adalah bahasa ketiga saya, tapi itu tak pernah menghalangi kami membangun bersama lintas zona waktu.",
					"Agustus itu kami terbang ke Coinfest Asia di Bali, sepekan yang memadukan konferensi dengan hackathon internal kecil di sebuah vila. Sama-sama soal koneksi baru, ide segar, dan bukti bahwa saya bisa mengikuti laju kripto.",
					"Menjelang akhir 2024 saya juga lulus, menutup babak tiga tahun kuliah. Bukan kampus terbesar atau paling bergengsi, tapi memberi saya fondasi untuk berkembang dan keyakinan untuk terus maju.",
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
					"Saya terus membangun sebagai Frontend Developer di Skyshi. Yang paling menonjol adalah moladinfinance.com untuk Moladin, dirilis dalam sekitar lima minggu, diikuti serangkaian proyek klien yang terikat NDA.",
					"Di sela itu, saya membangun ulang PC rakitan saya bagian demi bagian. Setelah setahun hanya dengan laptop, kembali ke setup yang layak dengan layar lebih besar dan ergonomi lebih baik terasa seperti kemewahan.",
					"Saya menyeimbangkan pekerjaan penuh waktu, kuliah, dan sedikit freelance Facebook bersama teman, menyelesaikan proyek-proyek itu dalam tiga bulan tanpa ada yang terbengkalai. Mengingatnya kembali, saya heran betapa banyak yang muat dalam setahun.",
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
					"Akhir Desember 2021 saya diterima sebagai intern di Skyshi Digital Indonesia, sebuah studio di Gamping, Yogyakarta. Kami bekerja sepenuhnya remote, kebiasaan masa pandemi yang dipertahankan perusahaan.",
					"Minggu-minggu pertama menegangkan tanpa pengalaman profesional sama sekali, tapi saya cepat menemukan ritme, ikut berkontribusi pada gethired.id, platform internal untuk melatih keterampilan siap kerja.",
					"Tiga bulan kemudian, mereka mempekerjakan saya penuh waktu sebagai Frontend Developer dan memindahkan saya ke proyek eksternal yang sering terikat NDA. Dari intern menjadi karyawan tetap adalah tonggak karier pertama saya, diraih sambil tetap mengikuti kuliah.",
				],
				photoAlts: ["Setup laptop Rizki di kafe dengan es kopi", "Potret Rizki bekerja dari kafe"],
			},
			"2021": {
				title: "Akademik",
				descriptions: [
					"Ini tahun saya mulai serius dengan software. Masih dalam pembatasan pandemi, saya mendalami dasar-dasar HTML, CSS, dan JavaScript lewat belajar mandiri dan apa pun yang bisa saya temukan online.",
					"Pada Mei celahnya jelas: pengetahuan tanpa pengalaman formal menyulitkan untuk diterima kerja. Maka saya bersandar pada struktur, dan akhir 2021 saya diterima di Diploma Manajemen Informatika.",
					"Di sela kuliah saya terus merilis proyek-proyek kecil agar tetap tajam. Setahun disiplin yang meletakkan fondasi bagi semua yang datang setelahnya.",
				],
				photoAlts: ["Swafoto Rizki, jaket masih basah usai hujan", "Laptop pertama Rizki"],
			},
			"2020": {
				title: "Pandemi",
				descriptions: [
					"Setahun ke dalam pandemi, rumah menjadi ruang kelas. Saya di tahun terakhir SMA, gelisah dan ingin melakukan sesuatu dengan waktu saya.",
					"Maka saya mulai mengambil pekerjaan freelance kecil di sekitar kampung untuk sedikit uang. Pertengahan 2020 saya cukup menabung untuk mulai membeli komponen PC, satu per satu, kapan pun saya mampu membeli yang berikutnya.",
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
					"Mengingatnya kembali, ini tahun-tahun emas. Bahkan saat pandemi mulai merayap, ini salah satu masa paling membentuk yang pernah saya alami. Saya belajar Rekayasa Perangkat Lunak di SMKN 8 Pandeglang, dan di sanalah membangun software pertama kali terasa klik.",
					"Tantangannya, kurikulum tertinggal bertahun-tahun dari yang dipakai industri, jadi saya belajar sisanya sendiri dari YouTube dan sumber gratis online, membangun kebiasaan belajar mandiri yang membawa saya sampai sekarang.",
				],
				photoAlts: ["Suasana ruang kelas", "Laboratorium komputer di masa itu"],
			},
		},
	},

	now: {
		seoTitle: "Saat Ini",
		seoDescription:
			"Kebanyakan situs punya halaman /about. Ini halaman /now saya — potret apa yang sedang saya fokuskan pada titik ini dalam hidup saya. Terinspirasi dari nownownow.com.",
		heading: "Apa yang Sedang Saya Kerjakan",
		introLead:
			"Kebanyakan situs punya halaman /about. Ini halaman /now saya — potret apa yang sedang saya fokuskan pada titik ini dalam hidup saya. Terinspirasi dari",
		items: {
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
			"Catatan tentang apa yang saya pelajari dan bagaimana saya mempelajarinya sebagai frontend software engineer — pemecahan masalah, pembahasan teknis mendalam, dan sesekali resep praktis.",
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
