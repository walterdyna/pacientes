new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
      return {
        pacientes: [],
        dialog: false,
        pacienteAtual: {
          nome: '',
          idade: 0
        },
        columnDefs: [
          { headerName: 'Nome', field: 'nome', sortable: true, filter: true },
          { headerName: 'Idade', field: 'idade', sortable: true, filter: true },
          {
            headerName: '',
            cellRenderer: this.editDeleteButtonRenderer,
            width: 100,
            suppressSizeToFit: true
          }
        ]
      };
    },
    methods: {
      adicionarPaciente() {
        this.pacientes.push({...this.pacienteAtual});
        this.dialog = false;
        this.pacienteAtual.nome = '';
        this.pacienteAtual.idade = 0;
      },
      removerPaciente(index) {
        this.pacientes.splice(index, 1);
      },
      editDeleteButtonRenderer(params) {
        var eDiv = document.createElement('div');
        eDiv.innerHTML = `
          <span><i class="mdi mdi-pencil" style="cursor: pointer; margin-right: 8px;" title="Editar" @click="editarPaciente(${params.rowIndex})"></i></span>
          <span><i class="mdi mdi-delete" style="cursor: pointer;" title="Excluir" @click="removerPaciente(${params.rowIndex})"></i></span>
        `;
        return eDiv;
      },
      editarPaciente(index) {
        this.pacienteAtual = {...this.pacientes[index]};
        this.dialog = true;
      }
    },
    components: {
      // adicionar mais conforme necessário
    },
    mounted() {
      tinymce.init({
        selector: '#descricao',
        plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        menubar: false
      });
    }
  });
  