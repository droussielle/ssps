// status: -1:Chưa in, 0:Đang in  1: Đã in
Queue = [{
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 0,
    'status': 1
}, {
    'title': "06_Ch6 System Modeling_2023.pdf",
    'location': "H1-203",
    'time': 2,
    'status': 0
}, {
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 6,
    'status': 0
}]
let str = ''
str += `<div class="flex w-full flex-row items-center justify-between pb-2">
<p class="text-xl font-bold">Hàng đợi</p>
</div>
<div class="flex flex-row">
<p class="grow text-sm font-bold text-gray-600">Tiêu đề</p>
<p class="basis-24 text-sm font-bold text-gray-600">Địa điểm</p>
<p class="basis-28 text-sm font-bold text-gray-600">Tình trạng</p>
<p class="basis-24 text-sm font-bold text-gray-600">Dự kiến</p>
<div class="basis-9"></div>
<hr class="w-full border" />
</div>
    `
Queue.forEach((el, index) => {
    str += `
    <div class="flex flex-row py-1">
    <p class="grow truncate text-left">
      `+ el['title'] + `
    </p>
    <p class="shrink-0 basis-24">`+ el['location'] + `</p>
    <p class="shrink-0 basis-28">`
    if (el['status'] == -1) {
        str += `<p class="basis-28">Chưa in</p>`
    }
    if (el['status'] == 0) {
        str += `<p class="basis-28">Đang in</p>`
    }
    if (el['status'] == 1) {
        str += `<p class="basis-28">Đã in</p>`
    }
    str += `</p>
    <p class="shrink-0 basis-24">`+ el['time'] + ` phút</p>
    `
    if (el['status'] == 1) {
        str += `
    <a href="" class="basis-9 text-blue-primary">Hủy</a>`
    }
    else {
        str += `
    <a href="" class="basis-9 text-blue-primary"></a>`
    }
    `
  </div>`
});
str += `
  </div>
  <div class="flex w-full flex-row items-center justify-end space-x-3 pb-1"
            >
              <button
                id="pause-print"
                type="button"
                class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active"
              >
                Tạm dừng in
              </button>
              <button
                id="stop-print"
                type="button"
                class="items inline-flex gap-x-1 rounded-full bg-red-700 px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-red-600 hover:shadow-3 active:bg-red-800"
              >
                Dừng in
              </button> 
            </div>`
$('#queue').html(str);
