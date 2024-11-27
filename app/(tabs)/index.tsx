import React from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import firestore methods

import { collection, addDoc } from 'firebase/firestore';
//import { db } from '../../firebaseConfig.js'; // Adjust path as necessary



const rentalApplicationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  monthlyIncome: yup
    .number()
    .typeError('Monthly income must be a number')
    .positive('Monthly income must be positive')
    .required('Monthly income is required'),
  references: yup.string().required('References are required'),
});

export default function App() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(rentalApplicationSchema),
  });


  // Updated onSubmit function for Firebase
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'app1'), data);
      Alert.alert('Application Submitted', `Document ID: ${docRef.id}`);
      reset();
    } catch (e) {
      console.error('Error adding document: ', e);
      Alert.alert('Error', 'Failed to submit application');
    }
  };
  
// above

  /*
  const onSubmit = (data) => {
    Alert.alert('Application Submitted', JSON.stringify(data, null, 2));
    reset();
  };

*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rental Application Form</Text>

      <View style={styles.field}>
        <Text>Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your full name"
            />
          )}
        />
        {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text>Phone Number</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
            />
          )}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text>Monthly Income</Text>
        <Controller
          control={control}
          name="monthlyIncome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              placeholder="Enter your monthly income"
            />
          )}
        />
        {errors.monthlyIncome && <Text style={styles.error}>{errors.monthlyIncome.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text>References</Text>
        <Controller
          control={control}
          name="references"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter references (names, contact info)"
              multiline
            />
          )}
        />
        {errors.references && <Text style={styles.error}>{errors.references.message}</Text>}
      </View>

      <Button title="Submit Application" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
