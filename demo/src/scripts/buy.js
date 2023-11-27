var data = [
  {
    page: 5,
    cost: 1000,
  },
  {
    page: 10,
    cost: 2000,
  },
  {
    page: 15,
    cost: 1500,
  },
  {
    page: 20,
    cost: 2000,
  },
  {
    page: 25,
    cost: 2500,
  },
];
$(() => {
  loadData();
});

function loadData() {
  var str = `<p class="text-xl font-bold">Mua thêm trang</p>
    <p>Chọn số trang cần mua</p>`;
  data.forEach((el, index) => {
    str +=
      `<div class="flex flex-row justify-between" id="buy-item">
        <div class="flex flex-row items-center space-x-2">
          <input id="default-radio-1" type="radio" value="" name="default-radio"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" />
          <p>` +
      el['page'] +
      ` trang</p>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <p>` +
      el['cost'].toLocaleString('de-DE') +
      `₫</p>
        </div>
      </div>`;
  });
  str += `<div class="flex w-full flex-row items-center justify-between pb-2">
    <button type="button"
      class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:shadow-3 active:bg-gray-200">
      Hủy
    </button>
    <button type="button"
      class="items inline-flex gap-x-1 rounded-full bg-blue-primary px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-[#0d3eba] hover:shadow-3 active:bg-[#032478]">
      Tiếp tục
    </button>
  </div>`;
  $('#buy-pages').html(str);
}
