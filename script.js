let keranjang = [];

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

function tambahProduk() {
  const nama = document.getElementById("nama").value.trim();
  const harga = Number(document.getElementById("harga").value);
  const jumlah = Number(document.getElementById("jumlah").value);

  if (!nama || harga <= 0 || jumlah <= 0) {
    alert("Lengkapi nama, harga, dan jumlah produk!");
    return;
  }

  keranjang.push({
    nama: nama,
    harga: harga,
    jumlah: jumlah
  });

  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("jumlah").value = 1;

  tampilkanKeranjang();
}

function hapusProduk(index) {
  keranjang.splice(index, 1);
  tampilkanKeranjang();
  document.getElementById("hasil").innerHTML = "";
}

function tampilkanKeranjang() {
  const area = document.getElementById("keranjang");
  const totalEl = document.getElementById("total");

  if (keranjang.length === 0) {
    area.innerHTML = '<div class="kosong">Belum ada produk.</div>';
    totalEl.textContent = "Rp0";
    return;
  }

  let total = 0;
  area.innerHTML = "";

  keranjang.forEach((produk, index) => {
    const subtotal = produk.harga * produk.jumlah;
    total += subtotal;

    area.innerHTML += `
      <div class="item">
        <div class="item-info">
          <strong>${produk.nama}</strong>
          <small>${produk.jumlah} x ${formatRupiah(produk.harga)}</small>
          <div>${formatRupiah(subtotal)}</div>
        </div>
        <button class="hapus" onclick="hapusProduk(${index})">Hapus</button>
      </div>
    `;
  });

  totalEl.textContent = formatRupiah(total);
}

function hitungKembalian() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const bayar = Number(document.getElementById("bayar").value);
  const total = keranjang.reduce(
    (sum, produk) => sum + produk.harga * produk.jumlah,
    0
  );

  if (bayar <= 0) {
    alert("Masukkan jumlah uang pembayaran!");
    return;
  }

  if (bayar < total) {
    document.getElementById("hasil").innerHTML =
      "Uang pembayaran kurang " + formatRupiah(total - bayar);
    return;
  }

  const kembalian = bayar - total;

  document.getElementById("hasil").innerHTML =
    "Pembayaran berhasil!<br>Kembalian: " + formatRupiah(kembalian);
}

function resetKasir() {
  keranjang = [];
  document.getElementById("bayar").value = "";
  document.getElementById("hasil").innerHTML = "";
  tampilkanKeranjang();
}

tampilkanKeranjang();
