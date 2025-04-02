import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Dashboard() {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [{ data: [20, 45, 28, 80], color: () => '#4A90E2' }],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Agendamentos Mensais</Text>
            <LineChart
                data={data}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#FFFFFF',
                    backgroundGradientTo: '#FFFFFF',
                    decimalPlaces: 0,
                    color: () => '#4A4A4A',
                    labelColor: () => '#9B9B9B',
                }}
                bezier
                style={styles.chart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#9B9B9B',
        marginBottom: 20,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
    },
});