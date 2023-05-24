import React from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFWithQRCode = () => {
  const handlePDFDownload = async () => {
    const elem = document.getElementById("print");
    if (!elem) {
      console.log("No element found in DOM");
      return;
    }

    html2canvas(elem).then((canvas) => {
      canvas.getContext("2d");
      console.log(`${canvas.height}  ${canvas.width}`);
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new jsPDF("p", "px", "a4");
      doc.addImage(imgData, "JPEG", 10, 10, 400, 200);

      doc.save("demo.pdf");
    });
  };

  return (
    <>
      <div
        id="print"
        style={{
          border: "1px solid #dde3ec",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          width: 470,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            marginRight: 10,
            position: "relative",
            textAlign: "center",
            width: 150,
          }}
        >
          <img
            src="data:image/png;base64,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"
            alt="FasTab"
            style={{ height: 20, textAlign: "center" }}
          />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABCPSURBVHgB7Z1nrBVFFMcHxILELmrsPQHR+BA1omiwIIixRbF80Ch+IMQEa4TEp0aMYoEgMZZoop+wED9YUPOeaFAsWIAYRLEi+qT3Xtf9b7gvM2fm3j0zd/feu5fzSza8HWZmZ3fP3T175pwzXaIYJQhMuipB8EAERvBCBEbwQgRG8EIERvBCBEbwQgRG8KJQAtOMJiOcU5HOqxun0pIlS9R3332n6k2vXr3USSedZJR98803avny5UbZoEGD1F577aWyYO7cuWrBggVG2XnnnacOOeQQlQW//fab+vXXX1W96devnzriiCPSK0YM3nvvPfwE6r6NGzfOGtull15q1Vu2bFmUFaNGjbL6nz59epQVTz75ZENcW9xjDvJKErwQpVfwQgRG8IKl9Lo47LDDEkWpS5cuKg9mz56tFi1a5P0awnhiXUftu+++Fesdd9xx6o477sht/Bs2bFBPPfVU8jfOAceBwn7bbbdVbId6UD779u2r8gBj+f7779XSpUtVCMECA2GZOnWqyoubbrpJvfXWW8oXXJAJEyakCtqAAQPU8OHDVV5s2rRJjR071ii77LLLUgUG477wwgvVm2++qfIA/V955ZXqww8/VCEEv5Ly+mWWqEbBFeU4P0SHEbzITGCa4Ved9TnoT+G8n8iVyPK8gnUYF62trYlC5Uvv3r3V+PHjVb2ZMmWKeu2114yy+fPnJzfb96Lvt99+lp5w8MEHq1Duu+8+NW/ePOULdM3HHntMZUVmAoOLCmH5+OOPlS9r1qxRjcDChQuDxu9i7733VoMHD1ZZgSmQr776SoWQ5dNNdBjBCxEYwQsRGMGLTJXeejB58mS1devWinVgRDvllFNUnsCKu2XLlop1YCx84403VJEpvMD07Nkztc7GjRtV3ixevDj1OCtWrFBFZ7d4JdXTBtJsiA4jeFH4V9K2bds6Z4MB/t5zzz2Dnipdu3ZluXbu3LkzOa4O2m3fvt05tmai8E+YoUOHJkYy3DBs++yzj+Xjy+Xee+9NFNdK2+bNm9UjjzzSebzS9u+//xr1sN+MFF5g6C9Yf9rkQbm+aXnIdEIREB1G8KLwAuP6xXN+2fLlFEamSi9mndeuXat86dOnjwoFx4Q7pM6cOXNUjx49OvehpPbv39+oc9ppp1nKMvSOf/75x6gHV86jjjpK1ZvQa4Trk+VrOlOBqYeLwsSJE60yGPN0xRf+vVSoKLigcAl94IEHrP5HjRql6s3LL7+sGgHRYQQvRGAEL0RgBC+CdRjEDSEUJC9bw8yZM1m2jA8++MAykt14441qx44dnfvo56WXXjLqIPbn6quvbrivJYwH3nU4h7z6x0dBKMEC899//wXFDWXNpEmTVHt7u1G2bNkydeihh3buYxZZ/2oCiP255pprVKOBH8jff/+dbI1I01l6XYTaagSb3UKHEeHIjsIIDJ4SricFZphD+2sUimR17hIxfn7IkvTOO++oenPRRRcl2Z904PJI3/fr1q1LrLs6BxxwgLGP06ZWacx6Y7ZbB7PT1PUShkC4UOggbkgvg+GQegMitrqtrc0o+/rrr9X06dNVvbnhhhus7F5OoiYkVniN7ErxDbbqIIuUIlmYYiuvVS80AxWyYNF2scBERUfsMIIXIjCCFyIwghcspReWRwTa69x+++3qlltuSWuqbr755iS8IqrRpy2+OO666y4jAxXKLrnkEqPeypUr1Q8//GB8oSB2+YsvvjDqoR0C2nUQC0XdIGBxhtJcgiq9OA5StZ555plGO1wfXMu0L6W7775b/fTTT519ASR00hVtfJyMHDlShYCAffpB4YSj6LjSro4dO5bTNDryyCNrnkI0NO3qM888Y/U1ceJEq15sJbbqbdiwwajjUnpd2+jRo1lj69+/v9V269atRp34BxB8zZoy7WqzEgU+fWm7WthzRGAEL2ouMNRiW86Cy60XSuTI8R9VoWdFKdEL+JtrlXaNwxWVwGnnoprrWPNANihpHR0dRhnWMbjiiiuMMmSbjHUKowxZKTE7nQVQ5OHeoF9kWHVDOf744419ZJvCGg36zYFF9/rrr6/YD8bz4IMPqtdff90YG026hP/TfY1xHBpI5wL17rnnHjVmzBijHBmzONRcYHCiuusBOPDAA6163bt3N+qhXVruXR8QlQg3iKxwBc/RqYH9999fpYEbiqkNzthCAvZK15HeAy6iwwheNKXAVKOLUJotfqna88n9lYRXi/4qQRwyQj70gUN3oK8bKIh6vpWSENB6eG/rCYXQLxII6W1RhnHooAxe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"
            alt="Barcode"
          />
          <img
            src="https://web2.anasource.com/design/fastab-admin/static/media/ic-arrow-blue.7d4e49bdfce050fe3f3e7ae3bda7807e.svg"
            alt="Arrow"
            style={{
              position: "absolute",
              top: 0,
              right: -30,
              height: 50,
              width: 50,
            }}
          />
        </div>
        <div>
          <p style={{ marginBottom: 10, fontWeight: "bold" }}>
            Scan to view menu + pay
          </p>
          <p>Confusion corner drinks + Food</p>
        </div>
      </div>
      <Button onClick={handlePDFDownload}>Test PDF</Button>
    </>
  );
};

export default PDFWithQRCode;
