'use strict';

var React = require('react-native');

var {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Component,
} = React;

var SearchResults = require('./SearchResults');

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text)=> this.setState({
                        searchQuery: text
                    })}
                    style={styles.input}
                    placeholder="Search Query"></TextInput>
                <TouchableHighlight
                    onPress={this.onSearchPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>

            </View>


        );
    }

    onSearchPressed(){
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
}

var styles = React.StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 100,
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
    input: {
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

module.exports = Search;