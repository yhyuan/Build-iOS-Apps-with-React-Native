'use strict';

var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Image = React.Image;

var {
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight
} = React;

var Login = React.createClass({
    render: function(){
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')} />
                <Text style={styles.heading}>Github browser</Text>
                <TextInput style={styles.loginInput} placeholder="Github username"></TextInput>
                <TextInput style={styles.loginInput} placeholder="Github password" secureTextEntry="true"></TextInput>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
            </View>


        );
    }
});

var styles = React.StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height:55
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    }
});

module.exports = Login;