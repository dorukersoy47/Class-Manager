import { Page, Text, View, Document, pdf } from '@react-pdf/renderer';

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

export const EducationPDF = (id, levels) => {
  const milestones = [30, 33, 35, 40, 33, 39, 45, 52];

  const MyDocument = (
    <Document>
      <Page size="A4">
        <View>
          <Text>Generated Report for Student {id}</Text>
          {levels.map((level, index) => (
            <Text>
              Level {index + 1}: {evaluateLevel(level.startDate, level.endDate, milestones[index])}
            </Text>
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
        link.download = 'education.pdf';
        link.click();
    });
};
