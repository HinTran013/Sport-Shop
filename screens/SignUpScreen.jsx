import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';

export default function SignUpScreen() {
  return (
    <View>
      <View style={styles.container}>
            <View>
            <TouchableOpacity>
                <Image source={require('../assets/arrow-left.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder='Name' />
            <TextInput
                style={styles.input}
                placeholder='Email' />
            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                />
            <TouchableOpacity>
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    alignSelf: 'flex-end', 
                    marginTop: 15 }}>
                    <Text style={styles.forgot}>Already have an account?</Text>
                    <Image source={require('../assets/arrow-right.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={{ 
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 14
                }}>SIGN UP</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.socialContainer}>
                <Text style={styles.social}>Or sign up with social account</Text>
                <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'center' 
                }}>
                <TouchableOpacity style={styles.buttonSocial}>
                    <Image source={require('../assets/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSocial}>
                    <Image source={require('../assets/facebook.png')} />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 50
    },
    container: {
        backgroundColor: '#f9f9f9',
        padding: 14,
        height: '100%',
        justifyContent: 'space-between'
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    forgot: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: '700'
    },
    button: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: '#DB3022',
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,  
        elevation: 5,
    },
    socialContainer: {
        flexDirection: 'column',
        alignContent: 'flex-end'
    },
    social: {
        fontSize: 14,
        textAlign: 'center'
    },
    buttonSocial: {
        paddingHorizontal: 35,
        paddingVertical: 20,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 19,  
        elevation: 5,
    }
});