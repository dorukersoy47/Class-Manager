import { Page, Text, View, Document, pdf, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
page: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#f0f0f0',
},
header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
},
id: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
},
transaction: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    border: '1 solid #ddd',
},
transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
},
transactionDescription: {
    fontSize: 14,
    color: '#666',
},
transactionDate: {
    fontSize: 14,
    color: '#666',
},
transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
},
});

export const FinancePDF = (id, transactions, lessonsNumber, studentFullName, t) => {
    const lessonPrice = 400;

    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>{t('financePDF.reportFor')} {studentFullName}</Text>
                <Text style={styles.id}>{t('financePDF.studentID')}: {id}</Text>
                <Text style={styles.transaction}>{t('financePDF.lessonsCompleted')}: {lessonsNumber} = -${lessonsNumber * lessonPrice}</Text>

                {transactions.map((transaction, index) => (
                    <View key={index} style={styles.transaction}>
                        <Text style={styles.transactionTitle}>{t('financePDF.title')}: {transaction.title}</Text>
                        <Text style={styles.transactionDescription}>{t('financePDF.description')}: {transaction.description}</Text>
                        <Text style={styles.transactionDate}>{t('financePDF.date')}: {new Date(transaction.date).toLocaleDateString('en-GB')}</Text>
                        <Text style={styles.transactionValue}>{t('financePDF.value')}: ${transaction.value}</Text>
                    </View>
                ))}
            </Page>
    </Document>
    );

    const blobPDF = pdf(MyDocument).toBlob();
    blobPDF.then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${studentFullName.replace(/\s+/g, '_')}_finance.pdf`;
        link.click();
    });
}