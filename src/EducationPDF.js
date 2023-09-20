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

const evaluateLevel = (startDate, endDate, milestone) => {
  if (!startDate || !endDate) {
    return 'Not Capable of Reporting';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInWeeks = Math.round((end - start) / (1000 * 60 * 60 * 24 * 7));

  let evaluation = 'Normal';
  if (differenceInWeeks < milestone - 2) {
    evaluation = 'Successful';
  } else if (differenceInWeeks > milestone + 2) {
    evaluation = 'Unsuccessful';
  }

  return `${evaluation} (Student: ${differenceInWeeks} weeks) (General: ${milestone} weeks)`;
};

export const EducationPDF = (id, levels, studentFullName) => {
  const milestones = [30, 33, 35, 40, 33, 39, 45, 52];

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Education Report for {studentFullName}</Text>
        <Text style={styles.id}>Student ID: {id}</Text>
        {levels.map((level, index) => (
          <View key={index} style={styles.transaction}>
            <Text style={styles.transactionTitle}>Level {index + 1}</Text>
            <Text style={styles.transactionDescription}>{evaluateLevel(level.startDate, level.endDate, milestones[index])}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  const blobPDF = pdf(MyDocument).toBlob();
  blobPDF.then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${studentFullName.replace(/\s+/g, '_')}_education.pdf`;
    link.href = url;
    link.click();
  });
};
