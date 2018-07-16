<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="fields"
    >
      <template slot="items" slot-scope="props">
        <td :class="checkRequired(props.item.id, props.item.name)">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close({id: props.item.id, field: 'name', value: props.item.name})"
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              v-model="props.item.name"
              label="Edit"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left" :class="checkRequired(props.item.id, props.item.quantity)">
          <v-edit-dialog
            :return-value.sync="props.item.quantity"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close({id: props.item.id, field: 'quantity', value: props.item.quantity})"
          > {{ props.item.quantity }}
            <v-text-field
              slot="input"
              v-model="props.item.quantity"
              label="Edit"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left" :class="checkRequired(props.item.id, props.item.thickness)">
          <v-edit-dialog
            :return-value.sync="props.item.thickness"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close({id: props.item.id, field: 'thickness', value: props.item.thickness})"
          > {{ props.item.thickness }}
            <v-text-field
              slot="input"
              v-model="props.item.thickness"
              label="Edit"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left" :class="checkRequired(props.item.id, props.item.material)">
          <v-edit-dialog
            :return-value.sync="props.item.material"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close({id: props.item.id, field: 'material', value: props.item.material})"
          > {{ props.item.material }}
            <v-text-field
              slot="input"
              v-model="props.item.material"
              label="Edit"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog
            :return-value.sync="props.item.bending"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close(props.item.bending, 'name', props.item.bending)"
          > {{ convertBool(props.item.bending) }}
            <v-text-field
              slot="input"
              v-model="props.item.bending"
              label="Edit"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog
            :return-value.sync="props.item.threading"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close({id: props.item.id, field: 'threading', value: props.item.threading})"
          >
            <div>{{ convertBool(props.item.threading) }}</div>
            <v-text-field
              slot="input"
              v-model="props.item.threading"
              label="Edit"
              single-line
              autofocus
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'fields',
        'errors'
      ])
    },
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        pagination: {},
        headers: [
          {text: 'Name', align: 'left', value: 'name', sortable: false},
          {text: 'Quantity', align: 'left', value: 'quantity', sortable: false},
          {text: 'Thickness', value: 'thickness', sortable: false},
          {text: 'Material', value: 'material', sortable: false},
          {text: 'Bending', value: 'bending', sortable: false},
          {text: 'Threading', value: 'threading', sortable: false}
        ]
      }
    },
    methods: {
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close ({id, field, value}) {
        this.$store.dispatch('updateOrderItem', {id: id, field: field, value: value})
      },
      convertBool (value) {
        return value ? 'Yes' : 'No'
      },
      checkRequired (id, value) {
        if ((this.errors.map((e) => { return e.id }).indexOf(value)) && (value === null)) {
          return 'red lighten-1'
        }
      }
    }
  }
</script>
