
function nRandom(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function nRandom9() {
	return new Array(9).fill('').map(() => nRandom(0, 9)).join('');
}

function calcularDigitos(cpf){
	let factor = cpf.length + 1; 
	const sum = cpf.split('').map(v => +v).reduce((s,v, i) => (s+((factor-i)*v)),0);
  let digit = 11 - (sum % 11);
   digit = digit > 9 ? 0: digit;
   cpf += digit;
	if (cpf.length <= 10) {
  	return calcularDigitos(cpf);
  }
  return cpf;
}

function formatCpf(numberStr, pos, mask) {
  pos = 0;
  mask = mask || '###.###.###-##';
	return mask.replace(/#/g, function(v,i) {
  	return numberStr.charAt(pos++);
  })
}

Vue.component('cpf', {
	props: ['pos','value'],
  data: function() {
  	return {
    	 result: {
        cpf: '',
        digits: '',
        sumStr: '',
        sum: 0
      }
    }
  },
  created: function() {
  	if (this.value.length === 9) {
      	const cpf = calcularDigitos(this.value);
      	this.result.cpf = formatCpf(cpf, 0, '###.###.###');
        this.result.digits = cpf.slice(9);
        this.result.sumStr = cpf.split('').join('+');
        this.result.sum = cpf.split('').map(v => +v).reduce((s, v) => s+v , 0);
      } else {
      	this.result.cpf = '';
        this.result.digits = '';
        this.result.sumStr = '';
        this.result.sum = 0;
      }
  },
  computed: {
  	position: function() {
    	return this.pos !== undefined ? (this.pos + 1) + ') ' : '';
    }
  },
  template: `
  	<div class="card d-flex justify-content-between mt-2 p-2" v-if="value.length === 9">
      <div>
      	<strong>{{position}}Cpf:</strong> {{result.cpf}}-<strong>{{result.digits}}</strong>
      </div>
      <div>
      	<strong>Soma:</strong>&nbsp{{result.sumStr}} = <strong :class="{diferente: ![33,44,55].includes(result.sum)}">{{result.sum}}
        </strong>
      </div>
    </div>
  `
})

var vm = new Vue({
	el: '#app',
  data: {
  	cpf9: '',
    cpfValid: false,
  	list: {
    	cpfs: []
    },
    nr: 50
  },
  methods: {
  	numberOnly: function(e){
    	let value = e.target.value;
      value = (value||'').replace(/\D/g, '');
      e.target.value = value;
    	this.cpf9 = value;
      this.cpfValid = this.cpf9.length === 9;
      
    },
    generateCpfs: function() { 
    this.list.cpfs = new Array(+this.nr)
      .fill('')
      .map(() => ({
      	id: Math.random().toString(16).slice(2),
        val: nRandom9()
      }));
    }
  }
})