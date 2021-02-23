import { Card, CardContent, Typography } from "@material-ui/core";
import "../App.js";
function InfoBox({ title, cases, total }) {
  return (
    <div className="infoBox">
      <Card>
        <CardContent>
          <Typography color="textSecondary" className="infoBox__title">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{cases}</h2>
          <Typography color="textSecondary" className="infoBox__total">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
