<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="success" show>
            {{ message }}
          </b-alert>

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Country</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Account Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.country }}</td>
                <td>{{ account.currency }}</td>
                <td>
                  <span
                    v-if="account.status === 'Active'"
                    class="badge badge-success"
                  >
                    {{ account.status }}
                  </span>
                  <span v-else class="badge badge-danger">
                    {{ account.status }}
                  </span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-account-modal
                      @click="editAccount(account)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <!-- Modal for Create Account -->
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
            id="form-name-group"
            label="Account Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="form-currency-group"
            label="Currency:"
            label-for="form-currency-input"
          >
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createAccountForm.country"
              placeholder="Country"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- Modal for Edit Account -->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Account Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="form-edit-country-group"
            label="Country:"
            label-for="form-edit-country-input"
          >
            <b-form-input
              id="form-edit-country-input"
              type="text"
              v-model="editAccountForm.country"
              placeholder="Country"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      createAccountForm: {
        name: "",
        currency: "",
        country: "",
      },
      editAccountForm: {
        id: "",
        name: "",
        country: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    // Fetch all accounts
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      console.log("GET path:", path); // Debugging API path
      axios
        .get(path)
        .then((response) => {
          console.log("Accounts fetched:", response.data.accounts); // Debugging fetched accounts
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error); // More descriptive error
        });
    },

    // Create a new account
    RESTcreateAccount(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      console.log("POST path:", path); // Debugging API path
      axios
        .post(path, payload)
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Created successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating account:", error); // More descriptive error
        });
    },

    // Update an account
    RESTupdateAccount(payload, accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      console.log("PUT path:", path); // Debugging API path
      axios
        .put(path, payload)
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Updated successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating account:", error); // More descriptive error
        });
    },

    // Delete an account
    RESTdeleteAccount(accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      console.log("DELETE path:", path); // Debugging API path
      axios
        .delete(path)
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Deleted successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting account:", error); // More descriptive error
        });
    },

    // Initialize the forms
    initForm() {
      this.createAccountForm = {
        name: "",
        currency: "",
        country: "",
      };
      this.editAccountForm = {
        id: "",
        name: "",
        country: "",
      };
    },

    // Handle create account form submission
    onSubmit(e) {
      e.preventDefault();
      this.$refs.addAccountModal.hide();
      const payload = { ...this.createAccountForm };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle edit account form submission
    onSubmitUpdate(e) {
      e.preventDefault();
      this.$refs.editAccountModal.hide();
      const payload = { name: this.editAccountForm.name, country: this.editAccountForm.country };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
      this.initForm();
    },

    // Pre-fill form for editing
    editAccount(account) {
      this.editAccountForm = { ...account };
    },

    // Delete account handler
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },
  },

  created() {
    this.RESTgetAccounts();
  },
};
</script>
