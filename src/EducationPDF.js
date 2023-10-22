import { Page, Text, View, Document, pdf, StyleSheet } from '@react-pdf/renderer';

//Page style
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
    education: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        border: '1 solid #ddd',
    },
    educationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    educationDescription: {
        fontSize: 14,
        color: '#666',
    },
    educationDate: {
        fontSize: 14,
        color: '#666',
    },
    educationValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export const EducationPDF = (id, levels, studentFullName, t) => {
    //Standard completion times (weeks)
    const milestones = [30, 33, 35, 40, 33, 39, 45, 52];

    //Evaluating the improvement of the student
    const evaluateLevel = (startDate, endDate, milestone, t) => {
        if (!startDate || !endDate) {
            return t('educationPDF.notCapable');
        }
    
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInWeeks = Math.round((end - start) / (1000 * 60 * 60 * 24 * 7));
    
        //Determining the improvement
        let evaluation = t('educationPDF.Normal');
        if (differenceInWeeks < milestone - 2) {
            evaluation = t('educationPDF.Succesful');
        } else if (differenceInWeeks > milestone + 2) {
            evaluation = t('educationPDF.Unsuccesful');
        }
    
        return `${evaluation} (${t('educationPDF.student')}: ${differenceInWeeks} ${t('educationPDF.weeks')}) (${t('educationPDF.general')}: ${milestone} ${t('educationPDF.weeks')})`;
    };

    //UI of the PDF document
    const MyDocument = (
        <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{t('educationPDF.reportFor')} {studentFullName}</Text>
            <Text style={styles.id}>{t('educationPDF.studentId')}: {id}</Text>
            {levels.map((level, index) => (
            <View key={index} style={styles.education}>
                <Text style={styles.educationTitle}>{t('educationPDF.level')} {index + 1}</Text>
                <Text style={styles.educationDescription}>{evaluateLevel(level.startDate, level.endDate, milestones[index], t)}</Text>
            </View>
            ))}
        </Page>
        </Document>
    );

    //Creating the PDF
    const blobPDF = pdf(MyDocument).toBlob();
    blobPDF.then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${studentFullName.replace(/\s+/g, '_')}_education.pdf`;
        link.href = url;
        link.click();
    });
};
