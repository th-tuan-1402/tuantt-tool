<template>
  <div>
    <textarea v-model="htmlInput" placeholder="Paste HTML here"></textarea>
    <button @click="convertHtmlToCsv">Convert to CSV</button>
    <a :href="csvData" download="data.csv" v-if="csvData">Download CSV</a>
  </div>
  <div v-if="htmlInput">
    <table>
      <template v-html="htmlInput"></template>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlInput: '', // nơi lưu html dạng plain text
      csvData: null, // nơi lưu kết quả csv
    };
  },
  methods: {
    convertHtmlToCsv() {
      // Tạo một DOMParser để phân tích cú pháp HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.htmlInput, 'text/html');
      const rows = doc.querySelectorAll('table tr'); // Tìm các hàng trong bảng
      
      // Chuyển đổi các hàng HTML thành dữ liệu CSV
      let csvContent = '';
      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData = Array.from(cells).map(cell => `"${cell.textContent.trim()}"`).join(',');
        csvContent += rowData + '\n';
      });
      
      // Chuyển đổi chuỗi CSV thành một Blob để có thể tải xuống
      const blob = new Blob([csvContent], { type: 'text/csv' });
      this.csvData = URL.createObjectURL(blob);
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}
</style>
