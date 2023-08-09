import { Page, Text, View, Document, pdf } from '@react-pdf/renderer';

export const FinancePDF = (id, transactions, lessonsNumber) => {
    const lessonPrice = 400;
    const MyDocument = (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Finance Transactions for Student {id}:</Text>
                    <Text>Lessons Completed: {lessonsNumber} = -{lessonsNumber * lessonPrice}$</Text>
                    {transactions.map((transaction, index) => (
                        <View key={index}>
                            <Text>Transaction Title: {transaction.title}</Text>
                            <Text>Transaction Description: {transaction.description}</Text>
                            <Text>Transaction Date: {new Date(transaction.date).toLocaleDateString('en-GB')}</Text>
                            <Text>Transaction Amount: ${transaction.value}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    const blobPDF = pdf(MyDocument).toBlob();
    blobPDF.then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'finance.pdf';
        link.click();
    });
};
