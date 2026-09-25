import {
	AMBULANCE_ZIG_ZAG_URL,
	formatRupiah,
	ntuNoteUrl,
	RIZKY_URL,
} from "./links";
import * as photo from "./photos";
import type { ArchiveYear } from "./types";

export const ARCHIVE_ID: ReadonlyArray<ArchiveYear> = [
	{
		year: 2026,
		title: "Masih Berjalan",
		paragraphs: [
			"Saya masih di Kolosal AI, dan makin dalam masuk ke urusan bikin produk AI. Setelah bertahun-tahun di web lalu kripto, ini dunia paling ngebut yang pernah saya jalani. Rasanya tiap beberapa bulan semuanya berubah total lagi.",
			"Ceritanya masih berjalan, jadi belum bisa saya rangkum dengan rapi. Untuk sekarang, saya fokus saja: kerja sebaik mungkin, belajar secepat mungkin, dan lihat nanti bakal dibawa ke mana.",
		],
		sections: [
			{
				heading: "Ide yang Sayang Dilewatkan",
				paragraphs: [
					`Awal Agustus, saya dan teman saya <a href="${RIZKY_URL}" target="_blank" rel="noopener noreferrer">Rizky<span class="sr-only">, terbuka di tab baru</span></a> mendaftar <em lang="en">hackathon</em> yang digelar Nanyang Technological University bersama SNZ Holding. Temanya <em lang="en">blockchain</em> dan web3.`,
					"Idenya dari Rizky. Indonesia, terutama Bali, masuk daftar impian liburan banyak orang, dan dia mau bikin infrastruktur pembayaran untuk itu. Rencananya menang dulu, biar proyeknya punya bekal buat jalan. Terus dia minta tolong saya, dan saya nggak perlu mikir lama. Kedengarannya keren banget.",
					"Kami mulai membangun Mayarin di bulan Agustus, dengan tenggat pengumpulan di pertengahan bulan. Setelah seminggu penjurian, kabar baiknya datang: kami lolos ke final, dan finalnya diadakan langsung di NTU.",
				],
			},
			{
				heading: "Bayar Kripto, Terima Rupiah",
				paragraphs: [
					'Timnya cuma kami berdua. Rizky pegang R&D dan infrastruktur, saya yang bikin <em lang="en">software</em>-nya.',
					'Mayarin itu SDK yang jadi jembatan antara kripto dan uang lokal. Bayangkan turis di Bali yang mau bayar pakai Ethereum. Mayarin langsung mengubahnya jadi <em lang="en">stablecoin</em>, jadi harganya nggak naik-turun selama pembayaran diproses. Dari situ, <em lang="en">payment gateway</em> mengubah <em lang="en">stablecoin</em> tadi jadi rupiah buat pedagang.',
					'Sampai ke sana nggak gampang. Di Indonesia, kripto masih agak tabu, dan di luar Gen Z dan orang yang kerja di dunia teknologi, kebanyakan orang belum banyak tahu soal kripto. Menukar kripto langsung ke rupiah juga diatur ketat, dan kami tentu harus taat hukum. Jadi versi yang kami bawa ke juri berhenti satu langkah sebelumnya: pelanggan bayar pakai kripto seperti Ethereum, dan pedagang menerima <em lang="en">stablecoin</em>.',
					'Karena <em lang="en">hackathon</em>-nya soal <em lang="en">blockchain</em>, nggak semua juri suka idenya. Tapi orang-orang dari SNZ Holding kelihatan tertarik, dan mereka banyak bertanya. Tiap tim cuma dikasih tujuh menit. Mana cukup, kalau yang di depanmu justru pengin dengar lebih banyak.',
				],
			},
			{
				heading: "Pertama ke Luar Negeri",
				paragraphs: [
					'Berangkat ke Singapura saja sudah jadi petualangan tersendiri. Kami ketinggalan pesawat pertama dan terpaksa tidur di kapsul di Soekarno-Hatta. Kami nyasar antara Changi dan kampus NTU, dan kartu transit kami selamat berkat isi ulang di 7-Eleven. Habis itu, dua hari penuh ngoding di Room B2 gedung ARC, lalu <em lang="en">pitching</em> hari Minggu.',
					"Kami pulang bawa Builder Recognition Award senilai USD 500. Tapi buat saya, yang lebih berharga justru perjalanannya sendiri. Itu pertama kalinya saya terbang ke luar Indonesia, dan saya berkesempatan menghabiskan tiga hari di salah satu kampus terbaik dunia.",
					`Pagi terakhir, kami buru-buru lihat Merlion sebelum ke bandara, dan tanggal 24 Agustus saya sudah di rumah. Semua ceritanya, termasuk drama ketinggalan pesawat, saya tulis di <a href="${ntuNoteUrl("id")}">Pertama Kali ke Luar Negeri, Langsung Ikut Hackathon di NTU</a>.`,
				],
				photos: [
					{
						src: photo.ntuCampus,
						alt: "Jalan di kampus NTU di bawah terik matahari, gedung di mana-mana",
					},
					{
						src: photo.ntuGrindingInB2,
						alt: "Saya dan Rizky kerja di meja bundar di Room B2 gedung ARC",
					},
					{
						src: photo.ntuProfWen,
						alt: "Dari kiri ke kanan: saya, Prof. Wen Yonggang dari NTU, dan Rizky",
					},
					{
						src: photo.ntuMerlion,
						alt: "Merlion menyemburkan air ke Marina Bay di pagi terakhir kami",
					},
				],
			},
		],
		photos: [],
	},
	{
		year: 2025,
		title: "Gabung Kolosal AI",
		paragraphs: [
			"Sekitar November, saya gabung Kolosal AI dan meninggalkan dunia kripto dan web3 untuk hal yang benar-benar baru: AI. Lagi-lagi lompatan, dari dunia yang sudah bikin saya nyaman ke dunia yang ritmenya beda total.",
			"Minggu-minggu pertama saya pakai buat menyesuaikan diri di bidang yang selama ini cuma saya tonton dari luar, bareng tim yang memang keren. Nggak butuh waktu lama sampai saya merasa inilah tempat yang saya harapkan.",
		],
		sections: [
			{
				heading: "Wajan Terbakar",
				paragraphs: [
					"Baru beberapa minggu di kerjaan baru, saya malah sukses bikin wajan kebakaran. Kejadiannya sekitar jam 3 sore. Saya baru goreng tempe, saya diamkan biar dingin, lalu saya duduk. Kompornya masih nyala.",
					'Yang pertama sadar justru adik perempuan saya. "Itu cahaya apaan?" Nggak tahu, jawab saya, saya cuma goreng tempe. Terus saya baru ngeh. Saya bangun, matikan kompor, lalu duduk lagi, tapi sudah telat. Sisa minyak di wajan sudah kepanasan sampai melewati titik bakarnya, dan wajannya pun terbakar.',
					"Saya langsung panik. Yang ada di kepala cuma satu: jangan sampai ini jadi kebakaran rumah beneran. Di luar lagi gerimis, jadi rencana saya sederhana: bawa wajannya keluar, biar hujan yang beresin.",
					"Rencana itu ternyata payah. Pas jalan keluar, angin bertiup dan mendorong apinya tepat ke muka saya. Saya kaget, dan refleks itu bikin wajannya miring. Minyak panas tumpah ke kaki kiri dan memercik ke kaki kanan. Saya coba mengibaskannya pakai tangan kiri, jadi tangan kiri ikut terbakar juga.",
					"Sambil nunggu ambulans, saya tanya ChatGPT soal pertolongan pertama. Sarannya: alirkan air sejuk ke luka bakar pelan-pelan, alirannya tenang dan stabil, jangan disemprot.",
				],
			},
			{
				heading: "Ambulance Zig Zag",
				paragraphs: [
					`Ambulansnya datang telat 30 menit, dan ongkosnya ${formatRupiah(900_000, "id")}. Sopirnya menyalahkan macet, tapi jujur, yang ini salah saya. HP saya nggak membagikan lokasi, jadi yang dapat pesanan malah ambulans yang jauh dari tempat saya.`,
					"Saya dibawa ke IGD rumah sakit terdekat. Lucunya, itu pertama kali saya menginjakkan kaki di rumah sakit.",
					`Lalu mulailah urusan birokrasi. Saya nggak punya BPJS, dan lagu Iwan Fals <a href="${AMBULANCE_ZIG_ZAG_URL}" target="_blank" rel="noopener noreferrer">“Ambulance Zig Zag”<span class="sr-only">, terbuka di tab baru</span></a> tiba-tiba terasa terlalu nyata. Saya ditaruh di ranjang lalu dibiarkan begitu saja. Nggak ada yang ngecek saya sampai teman saya selesai mengurus data diri dan pembayaran saya.`,
					"Baru setelah itu ada perawat yang datang. Dia mengoleskan krim ke luka bakar, menyuruh saya tenang dan mengatur napas, lalu memasang infus NaCl, yang juga pertama kali buat saya. Pulangnya saya juga dibekali obat, yang diam-diam saya stop setelah sebulan. Saya memang bukan orang yang doyan minum obat.",
					"Mereka menawarkan saya rawat inap semalam. Saya tolak. Semalam di sana bisa bikin dompet jebol.",
					"Saya telepon ibu duluan, dan beliau langsung kasih nasihat khas seorang ibu. Lalu saya telepon pacar saya, yang masih di kantor, buat kasih tahu kalau saya di rumah sakit. Dia bilang langsung berangkat. Sekitar lima jam kemudian, saya sudah di rumah lagi, kira-kira jam 10 malam.",
				],
			},
			{
				heading: "Dua Bulan Dirawat",
				paragraphs: [
					"Selama dua bulan setelahnya, pacar saya yang merawat saya. Hal paling sederhana pun, seperti ke kamar mandi, susah banget. Dia tentu punya urusan sendiri, tapi tiap selesai kerja dia datang buat masak dan bersih-bersih.",
					"Saya nggak pernah minta, dan kami juga nggak pernah benar-benar membahasnya. Dia datang begitu saja. Mungkin memang begitulah dia: sudah kerja sejak lulus SMA. Banyak orang pasti bakal cari alasan. Dia nggak, dan rasa terima kasih saya nggak cukup diungkapkan pakai kata-kata.",
					"Urusan kerjaan juga bikin saya kepikiran. Saya baru saja gabung Kolosal AI, dan saya yakin bakal kehilangan pekerjaan gara-gara ini. Saya kirim bukti kejadiannya, dan CEO-nya justru baik banget. Mereka menyuruh saya fokus pulih dan bilang semoga saya cepat sembuh. Bisa kerja di perusahaan seperti itu rasanya berarti banget.",
					"Sebulan kemudian, saya sudah bisa jalan, meski masih tertatih-tatih. Awal Februari 2026, perbannya sudah dilepas dan saya sudah bisa jalan normal lagi.",
				],
			},
			{
				heading: "Belajar Soal Luka Bakar",
				paragraphs: [
					"Kalau ada satu hal yang saya dapat dari kejadian ini, itu soal tingkatan luka bakar. Luka bakar derajat satu cuma kena lapisan kulit paling atas. Rasanya perih dan kulitnya memerah, seperti waktu kamu menyentuh wajan panas sepersekian detik atau kecipratan air panas.",
					"Derajat dua lebih dalam. Lebih merah dan jauh lebih sakit, dan ini yang saya alami. Kata dokter, luka saya lebih mendekati derajat dua setengah. Lukanya hampir kena saraf, dan kalau minyaknya lebih lama menempel di kaki, lukanya bakal jadi derajat tiga.",
					"Derajat tiga yang paling jangan sampai kejadian. Luka ini membakar kulit sampai habis, sarafnya juga, dan kulitnya nggak bisa tumbuh lagi sendiri, jadi perlu cangkok kulit dari bagian tubuh lain. Saya bersyukur banget luka saya nggak separah itu.",
				],
				figure: "burn-classification",
			},
		],
		photos: [],
	},
	{
		year: 2024,
		title: "Gabung Bitwyre",
		paragraphs: [
			'Sejak akhir 2023, saya lagi keranjingan kripto, web3, dan <em lang="en">trading</em>, kebanyakan gara-gara sering nanya-nanya ke teman yang sudah bertahun-tahun di bidang itu. Februari 2024, saya keluar dari Skyshi Digital Indonesia buat cari hal baru.',
			'Besoknya, teman yang sama mengenalkan saya ke Bitwyre, perusahaan kripto, web3, dan <em lang="en">trading</em>. Saya langsung melamar, wawancara dengan CTO dan CEO, lalu masuk tim <em lang="en">engineering</em> sebagai <em lang="en">frontend software engineer</em>. Begitu saja, yang tadinya cuma minat jadi pekerjaan saya.',
			"Bitwyre itu dunia yang lain lagi. Rekan setim saya tersebar di Kanada, Amerika Serikat, India, Eropa, dan tempat lain. Bahasa Inggris itu bahasa ketiga saya, tapi itu nggak pernah jadi halangan buat kami kerja bareng lintas zona waktu.",
			'Bulan Agustus, kami terbang ke Bali untuk Coinfest Asia. Seminggu itu isinya konferensi plus <em lang="en">hackathon</em> internal kecil-kecilan di sebuah vila, dan saya pulang bawa kenalan baru, ide segar, dan bukti kalau saya sanggup mengikuti ritme kripto yang serba cepat.',
			"Akhir 2024, saya juga wisuda, menutup tiga tahun kuliah. Kampusnya bukan yang paling besar atau paling bergengsi, tapi dari situ saya dapat fondasi buat terus membangun dan kepercayaan diri buat terus maju.",
		],
		photos: [
			{
				src: photo.festPass,
				alt: "Kartu akses festival Coinfest Asia milik Rizki",
			},
			{ src: photo.coinfest1, alt: "Rizki bersama maskot Indodax" },
			{ src: photo.coinfest0, alt: "Rizki bersama tim Bitwyre" },
			{ src: photo.coinfest2, alt: "Potret Rizki bersama tim Mandala Chain" },
			{
				src: photo.finalAssignment0,
				alt: "Wawancara dengan toko lokal untuk tugas akhir Rizki",
			},
			{
				src: photo.graduation0,
				alt: "Foto wisuda Rizki bersama ibu dan pacarnya",
			},
		],
	},
	{
		year: 2023,
		title: '<em lang="en">Work-Life Balance</em>',
		paragraphs: [
			'Saya masih jadi <em lang="en">frontend developer</em> di Skyshi. Yang paling berkesan adalah moladinfinance.com untuk Moladin, yang kami rilis dalam sekitar lima minggu. Setelah itu, ada serentetan proyek klien yang sampai sekarang masih nggak boleh saya ceritakan.',
			'Di sela-sela itu, saya merakit ulang PC, satu komponen demi satu komponen. Setelah setahun cuma pakai laptop, punya <em lang="en">setup</em> yang layak lagi, dengan layar lebih besar dan posisi kerja yang lebih nyaman, rasanya mewah banget.',
			'Saya juga harus bagi waktu antara kerja <em lang="en">full-time</em>, kuliah, dan proyek <em lang="en">freelance</em> bareng teman yang datang lewat Facebook. Proyek-proyek itu kami selesaikan dalam tiga bulan tanpa ada yang terbengkalai. Kalau diingat lagi, saya masih heran kok bisa sebanyak itu muat dalam setahun.',
		],
		photos: [
			{ src: photo.rebuild1, alt: "Komponen PC rakitan kedua Rizki" },
			{ src: photo.rebuild0, alt: "PC rakitan kedua Rizki, di sebelah laptop" },
			{ src: photo.rebuild3, alt: "Dual-boot Windows dan EndeavourOS" },
			{ src: photo.rebuild2, alt: "Tampilan akhir PC rakitan kedua Rizki" },
		],
	},
	{
		year: 2022,
		title: "Magang Sampai Diangkat",
		paragraphs: [
			'Akhir Desember 2021, Skyshi Digital Indonesia, studio di Gamping, Yogyakarta, menerima saya sebagai anak magang. Kami kerja <em lang="en">full remote</em>, kebiasaan dari masa pandemi yang tetap dipertahankan perusahaan.',
			'Tanpa pengalaman profesional sama sekali, minggu-minggu pertama lumayan bikin ciut. Tapi saya cepat dapat ritmenya, sambil mengerjakan gethired.id, platform internal buat latihan <em lang="en">skill</em> biar siap kerja.',
			'Tiga bulan kemudian, saya diangkat jadi karyawan tetap sebagai <em lang="en">frontend developer</em> dan dipindah ke proyek klien, yang kebanyakan terikat NDA. Naik dari anak magang jadi karyawan tetap sambil tetap kuliah adalah pencapaian karier pertama saya yang sesungguhnya.',
		],
		photos: [
			{ src: photo.wfc0, alt: "Laptop Rizki di kafe, ditemani es kopi" },
			{ src: photo.wfc1, alt: "Potret Rizki kerja dari kafe" },
		],
	},
	{
		year: 2021,
		title: "Mulai Kuliah",
		paragraphs: [
			'Tahun ini saya mulai serius di dunia <em lang="en">software</em>. Pandemi masih bikin semua orang di rumah, jadi saya mengasah dasar HTML, CSS, dan JavaScript dengan belajar sendiri dan apa pun yang bisa saya temukan di internet.',
			"Bulan Mei, saya mentok: punya ilmu tanpa pengalaman formal bikin susah dapat kerja. Jadi saya cari jalur yang lebih terarah, dan akhir 2021 saya diterima di program D3 Manajemen Informatika.",
			'Di sela kuliah, saya terus bikin proyek kecil biar <em lang="en">skill</em> nggak tumpul. Setahun penuh disiplin itu jadi fondasi buat semua yang datang setelahnya.',
		],
		photos: [
			{
				src: photo.selfie,
				alt: "Swafoto Rizki, jaketnya masih basah habis hujan",
			},
			{ src: photo.laptop, alt: "Laptop pertama Rizki" },
		],
	},
	{
		year: 2020,
		title: "Sedikit demi Sedikit",
		paragraphs: [
			"Pandemi bikin rumah jadi ruang kelas. Waktu itu saya kelas 12, nggak betah diam dan pengin ngapain aja dengan waktu yang ada.",
			'Jadi saya mulai ambil kerjaan <em lang="en">freelance</em> kecil-kecilan di sekitar kampung buat uang jajan. Pertengahan 2020, tabungan saya sudah cukup buat mulai beli komponen PC, satu per satu, setiap kali uangnya cukup untuk membeli komponen berikutnya.',
		],
		photos: [
			{ src: photo.pc0, alt: "Keyboard dan mouse" },
			{
				src: photo.pc1,
				alt: "PC rakitan pertama Rizki dengan wallpaper anime",
			},
			{ src: photo.pc2, alt: "Setup PC rakitan pertama Rizki" },
		],
	},
	{
		year: 2019,
		title: "Awal Mula",
		paragraphs: [
			'Kalau diingat lagi, ini masa-masa emas. Saya ambil jurusan Rekayasa Perangkat Lunak di SMKN 8 Pandeglang, dan di situlah saya pertama kali merasa cocok dengan dunia bikin <em lang="en">software</em>. Meski pandemi mulai masuk, ini salah satu masa yang paling membentuk diri saya.',
			"Masalahnya? Kurikulumnya ketinggalan bertahun-tahun dari yang benar-benar dipakai industri. Jadi sisanya saya pelajari sendiri dari YouTube dan sumber gratis di internet, dan dari situlah kebiasaan belajar mandiri saya terbentuk, yang terbawa sampai sekarang.",
		],
		photos: [
			{ src: photo.classroom, alt: "Suasana ruang kelas" },
			{ src: photo.pcLabs, alt: "Lab komputer zaman dulu" },
		],
	},
];
